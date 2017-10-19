import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import MainScreen from "../screens/Main/MainScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import SharesScreen from "../screens/Shares/SharesScreen";

export default StackNavigator({
  Main: {
    screen: TabNavigator({
      Lists: {
        screen: MainScreen
      },
      Shares: {
        screen: SharesScreen
      }
    })
  },
  Login: {
    screen: LoginScreen
  }
});
