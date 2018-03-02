import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';
import { Constants } from 'expo';

import * as firebase from 'firebase';

import {Container, Form, Item, Label, Input, Button} from 'native-base';

//Initialize Firebase
const config = {
  apiKey: "AIzaSyBwnN1XVet16BYoPeqGJWVSZrKnRymrkE0",
  authDomain: "xchangecmu.firebaseapp.com",
  databaseURL: "https://xchangecmu.firebaseio.com",
  projectId: "xchangecmu",
  storageBucket: "xchangecmu.appspot.com",
  messagingSenderId: "193210015593"
};
firebase.initializeApp(config);


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.props.navigation.state.key = 'Login'

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpPage = () => {
    this.props.navigation.navigate('SignUp');
  };

  //Navigate to home page
  homePage = () => {
    this.props.navigation.navigate('Tabs');
  };

  loginUser = (email, password, homeFn) => {
    try {
      firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
        homeFn();
      }).catch(function(error) {
        alert('Wrong email or password');
      });
    }
    catch(error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.logoConten}>
          <Image
           style = {styles.logo}
           source={require('./plaidcash.png')} />
         <Text style = {styles.titleApp}>XChangeCmu</Text>
        </View>

        <KeyboardAvoidingView behavior = "padding" >
        <Form style ={{flex:0}} >
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

          <Button style = {{marginTop: 10}}
            full
            success
            onPress = {
              () => this.loginUser(this.state.email, this.state.password, this.homePage)}>
            <Text style = {{color: 'white'}}>Login</Text>
          </Button>

          <Button style = {{marginTop: 10}}
            full
            primary
            onPress = {() => this.signUpPage()}>
            <Text style = {{color: 'white'}}>Signup</Text>
          </Button>
        </Form>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 15
  },
  logoConten:{
    flexGrow :1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleApp: {
    width : 200,
    fontSize: 30,
    fontWeight: "800",
    textAlign: 'center',
    marginTop: 10,
    color :'#000'
  },
});
