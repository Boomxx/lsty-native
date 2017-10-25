import React from "react";
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

export default props => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  return (
    <List
      dataSource={ds.cloneWithRows(props.lists)}
      renderRow={list => (
        <ListItem onPress={() => props.navigation.navigate("List", { list })}>
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
      renderLeftHiddenRow={list => (
        <Button full onPress={() => alert(list.name)}>
          <Icon active name="information-circle" />
        </Button>
      )}
      renderRightHiddenRow={(data, secId, rowId, rowMap) => (
        <Button full danger>
          <Icon active name="trash" />
        </Button>
      )}
      leftOpenValue={75}
      rightOpenValue={-75}
    />
  );
};
