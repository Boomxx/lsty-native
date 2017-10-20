import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon } from "native-base";
import { connect } from "react-redux";

import { setUser } from "../../state/actions/Auth";

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
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Container>
        <Text>Main Screen</Text>
        {this.props.user && <Text>User: {this.props.user.uid}</Text>}
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps, { setUser })(MainScreen);
