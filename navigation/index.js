import React from "react";
import { StackNavigator, TabNavigator } from "react-navigation";

import MainScreen from "../screens/Main/MainScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import SharesScreen from "../screens/Shares/SharesScreen";
import AccountScreen from "../screens/Account/AccountScreen";
import ListScreen from "../screens/List/ListScreen";

export default StackNavigator({
  Main: {
    screen: TabNavigator({
      Lists: {
        screen: MainScreen
      },
      Shares: {
        screen: SharesScreen
      },
      Account: {
        screen: AccountScreen
      }
    }),
    navigationOptions: ({ navigation }) => ({
      headerBackTitle: "Back"
    })
  },
  Login: {
    screen: LoginScreen
  },
  List: {
    screen: ListScreen,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.listName
    })
  }
});
