import * as types from "../types";

const INITIAL_STATE = {
  user: null,
  loginError: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { user: action.payload, loginError: null };
    case types.LOGIN_FAIL:
      return { user: null, loginError: action.payload };
    case types.LOGIN_SUCCESS:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
