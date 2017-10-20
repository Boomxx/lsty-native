import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "firebase";
import { AsyncStorage as storage } from "react-native";

import AuthReducer from "./reducers/Auth";
import ListReducer from "./reducers/List";

const createStoreWithMiddleware = applyMiddleware(
  thunk.withExtraArgument({ firebase, storage })
)(createStore);

const reducers = combineReducers({
  AuthState: AuthReducer,
  ListState: ListReducer
});

const store = createStoreWithMiddleware(reducers);

export default store;
