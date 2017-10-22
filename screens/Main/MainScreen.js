import React from "react";
import Expo, { AppLoading } from "expo";
import { StyleSheet, AsyncStorage, ListView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Badge
} from "native-base";
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

  ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

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
    if (!this.props.lists) {
      return <AppLoading />;
    }

    return (
      <List
        dataSource={this.ds.cloneWithRows(this.props.lists)}
        renderRow={list => (
          <ListItem>
            <Body>
              <Text> {list.name} </Text>
            </Body>
            <Right>
              <Badge primary>
                <Text>{list.unchecked.count}</Text>
              </Badge>
            </Right>
          </ListItem>
        )}
        renderLeftHiddenRow={data => (
          <Button full onPress={() => alert(list.name)}>
            <Icon active name="information-circle" />
          </Button>
        )}
        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
          <Button
            full
            danger
            onPress={_ => this.deleteRow(secId, rowId, rowMap)}
          >
            <Icon active name="trash" />
          </Button>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
      />
    );
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
