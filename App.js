import React from "react";
import { Provider } from "react-redux";
import firebase from "firebase";

import config from "./config/firebase-config";

import Navigation from "./navigation";
import store from "./state/store";

class App extends React.Component {
  componentWillMount() {
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
