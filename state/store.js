import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "firebase";

import AuthReducer from "./reducers/AuthReducer";

const createStoreWithMiddleware = applyMiddleware(
  thunk.withExtraArgument({ firebase })
)(createStore);

const reducers = combineReducers({
  AuthState: AuthReducer
});

const store = createStoreWithMiddleware(reducers);

export default store;
