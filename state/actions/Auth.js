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
  return async (dispatch, getState, { firebase, storage }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      await firebase.auth().setPersistence("local");

      await storage.setItem("user", JSON.stringify(user));
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

const logoutSuccess = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

const logoutFail = error => {
  return {
    type: types.LOGOUT_FAIL,
    payload: error
  };
};

export const logout = () => {
  return async (dispatch, getState, { firebase, storage }) => {
    try {
      await firebase.auth().signOut();
      await storage.removeItem("user");
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFail(error));
    }
  };
};
