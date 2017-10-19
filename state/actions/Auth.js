import * as types from "../types";

const loginSuccess = user => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user
  };
};

const loginFail = error => {
  return {
    type: types.LOGIN_FAIL,
    payload: error
  };
};

export const login = (email, password) => {
  return async (dispatch, getState, { firebase }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFail(error));
    }
  };
};

export const setUser = user => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: user
  };
};
