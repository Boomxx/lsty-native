import React from "react";
import Expo from "expo";
import { StyleSheet } from "react-native";
import { Container, Text, List, ListItem, Content } from "native-base";
import { connect } from "react-redux";

import ItemCollection from "./components/ItemCollection";

import * as actions from "../../state/actions/Item";

class ListScreen extends React.Component {
  componentWillMount() {
    const { addItemsListener, navigation } = this.props;
    addItemsListener(navigation.state.params.list.id);
  }

  componentWillUnmount() {
    const { removeItemsListener, navigation } = this.props;
    removeItemsListener(navigation.state.params.list.id);
  }

  renderItems = () => {
    if (this.props.items) {
      return <ItemCollection items={this.props.items} />;
    }
  };

  render() {
    return (
      <Container>
        <Content>{this.renderItems()}</Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState, ItemState }) => {
  return { ...AuthState, ...ItemState };
};

export default connect(mapStateToProps, actions)(ListScreen);
