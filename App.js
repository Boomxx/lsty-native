import React from "react";
import { Provider } from "react-redux";
import { Root } from "native-base";
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
      <Root>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </Root>
    );
  }
}

export default App;
