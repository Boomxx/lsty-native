import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon } from "native-base";
import { connect } from "react-redux";

class SharesScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "Shares",
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Icon name="md-share" style={{ color: tintColor }} />
    )
  };

  render() {
    return (
      <Container>
        <Text>Shares Screen</Text>
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps)(SharesScreen);
