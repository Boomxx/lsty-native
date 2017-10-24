import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import { Container, Text, Icon } from "native-base";
import { connect } from "react-redux";

class ListScreen extends React.Component {
  render() {
    return (
      <Container>
        <Text>List Screen</Text>
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps)(ListScreen);
