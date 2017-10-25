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
