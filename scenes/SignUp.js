import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Constants } from 'expo';

import * as firebase from 'firebase';

import {Container, Form, Item, Label, Input, Button, Header, Body, Title} from 'native-base';

//Sign up page
export default class SignUp extends Component {

  constructor(props) {
    super(props)

    this.state = ({
      name: '',
      email: '',
      password: ''
    })
  }

  signedUp = () => {
    this.props.navigation.navigate('Tabs');
  };

  signupUser = (email, password, name, fn) => {
    try {
      if (name == "") {
        alert("Enter a Name");
        return;
      }
      if (this.state.password.length < 6) {
        alert("At least 6");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
          user.updateProfile({
              displayName: name
          });
          fn();
        }).catch(function(error) {
          console.log(error);
          alert('Incorrect Email');
        });
    }
    catch(error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <Container >
        <Header>
          <Body>
            <Title>Sign Up</Title>
          </Body>
        </Header>
        <Container style = {styles.container} >
          <KeyboardAvoidingView behavior = "padding" >
            <Form>
              <Item floatingLabel>
                <Label>
                  Name
                </Label>
                <Input
                  autocorrect = {false}
                  onChangeText = {(name) => this.setState({name})}
                />
              </Item>

              <Item floatingLabel>
                <Label>
                  Email
                </Label>
                <Input
                  autocorrect = {false}
                  autoCapitalize = "none"
                  onChangeText = {(email) => this.setState({email})}
                />
              </Item>

              <Item floatingLabel>
                <Label>
                  Password
                </Label>
                <Input
                  secureTextEntry = {true}
                  autocorrect = {false}
                  autoCapitalize = "none"
                  onChangeText = {(password) => this.setState({password})}
                />
              </Item>

              <Button style = {{marginTop: 40}}
                full
                primary
                onPress = {() => this.signupUser(this.state.email,
                  this.state.password, this.state.name, this.signedUp)}>
                <Text style = {{color: 'white'}}>Signup</Text>
              </Button>
            </Form>
          </KeyboardAvoidingView>
        </Container >
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 15
  },
});
