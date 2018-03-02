import React, { Component } from 'react';
import { Text, View, StyleSheet,ScrollView} from 'react-native';
import { Constants } from 'expo';
import { TabNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import * as firebase from 'firebase';

import { Card, Tile, Button } from 'react-native-elements'; // 0.18.5

import {Container, Form, Item, Label, Input, Header, Body, Title} from 'native-base';

//Displays the current user's information
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    //Get current User Information
    var user = firebase.auth().currentUser;

    this.setState({
      name: user.displayName
    })
  }

  logout = () => {
    this.props.navigation.dispatch(NavigationActions.reset(
       {
          index: 0,
          key: null,
          actions: [
            NavigationActions.navigate({ routeName: 'Login'})
          ]}));
    firebase.auth().signOut();
  }

  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Account</Title>
          </Body>
        </Header>
        <ScrollView>
            <Tile
              imageSrc={{ uri: "https://www.collegedata.com/cs/page/content/college_spotlight/204/photos/204_01.jpg"}}
              featured
              title={this.state.name}
              caption={"Student"}
            />

        </ScrollView>
        <Button
          title="Logout"
          buttonStyle={{ marginBottom: 20, backgroundColor: '#ce3c3e'}}
          onPress={this.logout}
        />
      </Container>
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
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

export default Main;
