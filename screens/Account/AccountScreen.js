import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon, Button } from "native-base";
import { connect } from "react-redux";

import { logout } from "../../state/actions/Auth";

class AccountScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Account",
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-person" style={{ color: tintColor }} />
    )
  };

  hangleLogoutPress = () => {
    this.props.logout();
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <Container>
        <Button block primary onPress={this.hangleLogoutPress}>
          <Text>Logout</Text>
        </Button>
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps, { logout })(AccountScreen);
