import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon } from "native-base";
import { connect } from "react-redux";

import { setUser } from "../../state/actions/Auth";

class MainScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "lsty",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-list" style={{ color: tintColor }} />
    )
  };

  async componentWillMount() {
    await AsyncStorage.clear();
    const userJSON = await AsyncStorage.getItem("user");

    if (!userJSON) {
      this.props.navigation.navigate("Login");
    } else {
      const user = JSON.parse(userJSON);
      this.props.setUser(user);
    }
  }

  render() {
    return (
      <Container>
        <Text>Main Screen</Text>
        {this.props.user && <Text>User: {this.props.user.email}</Text>}
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps, { setUser })(MainScreen);
