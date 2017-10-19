import React from "react";
import Expo from "expo";
import { StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text
} from "native-base";
import { connect } from "react-redux";

import { login } from "../../state/actions/Auth";

const field = {
  email: "email",
  password: "password"
};

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerLeft: null,
    headerTitle: "Login"
  };

  state = {
    email: "",
    password: ""
  };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      await AsyncStorage.setItem("user", JSON.stringify(nextProps.user));
      this.props.navigation.goBack();
    }
  }

  handleLoginPress = () => {
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  onFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.email}
                onChangeText={value => this.onFieldChange(field.email, value)}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                onChangeText={value =>
                  this.onFieldChange(field.password, value)}
              />
            </Item>
          </Form>
          <Button block primary onPress={this.handleLoginPress}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ AuthState }) => {
  return { ...AuthState };
};

export default connect(mapStateToProps, { login })(LoginScreen);
