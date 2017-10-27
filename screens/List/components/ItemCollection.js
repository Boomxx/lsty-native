import React from "react";
import { StyleSheet, ListView } from "react-native";
import {
  Content,
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Badge,
  Grid,
  Col,
  Row,
  CheckBox
} from "native-base";

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 5
  }
});

export default props => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  const addedBy = item =>
    item.addedBy === props.user.email ? "You" : item.addedBy;

  return (
    <List
      dataSource={ds.cloneWithRows(props.items)}
      renderRow={item => (
        <ListItem onPress={() => props.onToggle(item)}>
          <CheckBox
            style={styles.checkbox}
            checked={item.got}
            onPress={() => props.onToggle(item)}
          />
          <Body>
            <Text>{item.name}</Text>
            <Text note>Added by {addedBy(item)}</Text>
          </Body>
        </ListItem>
      )}
      renderLeftHiddenRow={() => {}}
      disableRightSwipe={true}
      renderRightHiddenRow={(item, secId, rowId, rowMap) => (
        <Grid>
          <Col>
            <Button full>
              <Icon active name="md-create" />
            </Button>
          </Col>
          <Col>
            <Button
              danger
              full
              onPress={() => {
                props.onDelete(item);
                rowMap[`${secId}${rowId}`].props.closeRow();
              }}
            >
              <Icon active name="trash" />
            </Button>
          </Col>
        </Grid>
      )}
      rightOpenValue={-120}
    />
  );
};
