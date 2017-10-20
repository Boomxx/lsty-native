import * as types from "../types";

const INITIAL_STATE = {
  lists: null,
  shareError: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload
      };
    case types.UPDATE_LIST_COUNT:
      const { listId, count } = action.payload;

      return {
        lists: {
          ...state.lists,
          [listId]: {
            ...state.lists[listId],
            unchecked: { count }
          }
        }
      };
    case types.SHARE_LIST_FAIL:
      return { ...state, shareError: action.payload };
    case types.CLEAR_SHARE_ERROR:
      return { ...state, shareError: null };
    default:
      return state;
  }
};
