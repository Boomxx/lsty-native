import _ from "lodash";
import * as types from "../types";

const INITIAL_STATE = {
  items: null,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_ITEMS_SUCCESS:
      if (action.payload == null) {
        return {
          ...state,
          items: []
        };
      }

      return {
        ...state,
        items: _.keys(action.payload).map(key => {
          return {
            id: key,
            ...action.payload[key]
          };
        })
      };
    case types.STOPPED_LISTENING_ITEMS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
