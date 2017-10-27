import * as types from "../types";

const getItemsSuccess = items => {
  return {
    type: types.GET_ITEMS_SUCCESS,
    payload: items
  };
};

const getItemsFail = error => {
  return {
    type: types.GET_ITEMS_FAIL,
    payload: error
  };
};

export const addItemsListener = listId => {
  return async (dispatch, getState, { firebase }) => {
    firebase
      .database()
      .ref(`/lists/${listId}/items`)
      .on(
        "value",
        snapshot => {
          dispatch(getItemsSuccess(snapshot.val()));
        },
        error => {
          dispatch(getItemsFail(error));
        }
      );
  };
};

export const removeItemsListener = listId => {
  return (dispatch, getState, { firebase }) => {
    firebase
      .database()
      .ref(`/lists/${listId}/items`)
      .off();
    dispatch({ type: types.STOPPED_LISTENING_ITEMS });
  };
};

const toggleItemSuccess = () => {
  return {
    type: types.TOGGLE_ITEM_SUCCESS
  };
};

const toggleItemFail = error => {
  return {
    type: types.TOGGLE_ITEM_FAIL,
    payload: error
  };
};

export const toggleItem = (listId, item, uncheckedCount) => {
  return async (dispatch, getState, { firebase }) => {
    const updates = {
      [`/items/${item.id}/got`]: !item.got,
      "/unchecked/count": !item.got ? uncheckedCount - 1 : uncheckedCount + 1
    };

    try {
      await firebase
        .database()
        .ref(`/lists/${listId}`)
        .update(updates);
      dispatch(toggleItemSuccess());
    } catch (error) {
      dispatch(toggleItemFail(error));
    }
  };
};

const deleteItemSuccess = () => {
  return {
    type: types.DELETE_ITEM_SUCCESS
  };
};

const deleteItemFail = error => {
  return {
    type: types.DELETE_ITEM_FAIL,
    payload: error
  };
};

export const deleteItem = (listId, item, uncheckedCount) => {
  return async (dispatch, getState, { firebase }) => {
    const updates = {
      [`/items/${item.id}`]: null,
      "/unchecked/count": item.got ? uncheckedCount : uncheckedCount - 1
    };

    try {
      await firebase
        .database()
        .ref(`/lists/${listId}`)
        .update(updates);
      dispatch(deleteItemSuccess());
    } catch (error) {
      dispatch(deleteItemFail(error));
    }
  };
};
