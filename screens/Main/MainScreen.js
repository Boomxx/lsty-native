import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon } from "native-base";
import { connect } from "react-redux";

import { setUser } from "../../state/actions/Auth";
import { addListsListener } from "../../state/actions/List";

class MainScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "lsty",
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-list" style={{ color: tintColor }} />
    )
  };

  async componentWillMount() {
    try {
      const userJSON = await AsyncStorage.getItem("user");

      if (!userJSON) {
        this.props.navigation.navigate("Login");
      } else {
        const user = JSON.parse(userJSON);
        this.props.setUser(user);
        this.props.addListsListener(user.uid);
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    console.log("unmounting");
  }

  render() {
    return (
      <Container>
        <Text>Main Screen</Text>
        {this.props.user && <Text>User: {this.props.user.uid}</Text>}
        {this.props.lists && <Text>{JSON.stringify(this.props.lists)}</Text>}
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState, ListState }) => {
  return { ...AuthState, ...ListState };
};

export default connect(mapStateToProps, { setUser, addListsListener })(
  MainScreen
);
