import React from "react";
import Expo, { AppLoading } from "expo";
import { StyleSheet, AsyncStorage, ListView } from "react-native";
import { Container, Content, Icon } from "native-base";
import { connect } from "react-redux";
import ListCollection from "./components/ListCollection";

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

  renderLists = () => {
    const { lists, navigation } = this.props;

    if (!lists) {
      return <AppLoading />;
    }

    return <ListCollection lists={lists} navigation={navigation} />;
  };

  render() {
    return (
      <Container>
        <Content>{this.renderLists()}</Content>
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
