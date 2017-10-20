import * as types from "../types";
import _ from "lodash";

const getListsSuccess = lists => {
  return {
    type: types.GET_LISTS_SUCCESS,
    payload: lists
  };
};

const getListsFail = error => {
  return {
    type: types.GET_LISTS_FAIL,
    payload: error
  };
};

export const addListsListener = uid => {
  return async (dispatch, getState, { firebase }) => {
    const db = firebase.database();
    try {
      db.ref(`userData/${uid}/lists`).on("value", async snapshot => {
        const lists = {};
        const listIds = _.keys(snapshot.val());

        for (const listId of listIds) {
          const list = (await db.ref(`lists/${listId}`).once("value")).val();

          if (list == null) {
            //list has been deleted, remove from user lists
            db.ref(`userData/${uid}/lists/${listId}`).remove();
          } else {
            db.ref(`lists/${listId}/unchecked`).off();
            db
              .ref(`lists/${listId}/unchecked`)
              .on("child_changed", snapshot => {
                dispatch(updateListCount(listId, snapshot.val()));
              });

            lists[listId] = { id: listId, ...list };
          }
        }
        dispatch(getListsSuccess(lists));
      });
    } catch (error) {
      dispatch(getListsFail(error));
    }
  };
};

export const removeListsListener = (uid, lists) => {
  return (dispatch, getState, { firebase }) => {
    const db = firebase.database();

    db.ref(`userData/${uid}/lists`).off();
    _.keys(lists).forEach(listId => db.ref(`lists/${listId}/unchecked`).off());
    dispatch({ type: types.STOPPED_LISTENING_LISTS });
  };
};

const addListFail = error => {
  return {
    type: types.ADD_LIST_FAIL,
    payload: error
  };
};

export const addList = (user, listName) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const db = firebase.database();
      const key = db.ref("lists").push().key;

      await db.ref(`userData/${user.uid}/lists/${key}`).set(1);

      const updates = {
        owner: { id: user.uid, email: user.email },
        name: listName,
        unchecked: { count: 0 }
      };

      await db.ref(`lists/${key}`).update(updates);
    } catch (error) {
      dispatch(addListFail(error));
    }
  };
};

export const deleteList = (user, list) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const db = firebase.database();

      //remove from /lists if the user is the list owner
      if (list.owner.id === user.uid) {
        //first confirm the list owner is actually the same in the db
        const dbOwner = (await db
          .ref(`lists/${list.id}/owner/id`)
          .once("value")).val();

        if (dbOwner === list.owner.id) {
          db.ref(`lists/${list.id}`).remove();
        }
      }

      //remove from user's lists
      db.ref(`userData/${user.uid}/lists/${list.id}`).remove();
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateListCount = (listId, count) => {
  return {
    type: types.UPDATE_LIST_COUNT,
    payload: { listId, count }
  };
};
