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
  Badge,
  Grid,
  Col,
  Row
} from "native-base";

export default props => {
  const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
  });

  return (
    <List
      dataSource={ds.cloneWithRows(props.items)}
      renderRow={item => (
        <ListItem>
          <Body>
            <Text> {item.name} </Text>
          </Body>
        </ListItem>
      )}
      renderLeftHiddenRow={() => {}}
      disableRightSwipe={true}
      renderRightHiddenRow={(item, secId, rowId, rowMap) => (
        <Content>
          <Grid>
            <Col>
              <Button full>
                <Icon active name="md-create" />
              </Button>
            </Col>
            <Col>
              <Button danger full>
                <Icon active name="trash" />
              </Button>
            </Col>
          </Grid>
        </Content>
      )}
      rightOpenValue={-100}
    />
  );
};
