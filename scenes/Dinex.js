import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import { Constants } from 'expo';

import * as firebase from 'firebase';

import {Container, Header, Content, Segment, Left, Right, Icon,
        Body, List, ListItem, Button, Tab, Tabs, TabHeading, } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const rootRef = firebase.database().ref();
const UsersRef = rootRef.child('users');

//Feed that shows a list of Dinex available
class Dinex extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      users: "",
      dinexArr: [],
      refreshing: false,
    });
  }

  //Handles updating the list of Dinex available
  getDinex() {
    UsersRef.on('value', (childSnapshot) => {
      const users = [];
      childSnapshot.forEach((doc) => {
        users.push({
          key: doc.key,
          rest: doc.toJSON()
        });

        this.setState({
          users: users,
        })
      });

      const dinexArr = [];
      for (let i = 0; i < users.length; i++) {

        var rest = users[i].rest;

        for (var key in rest) {
          if (!rest.hasOwnProperty(key)) continue;

          var obj = rest[key];

          if (obj.block == "dinex") {
            dinexArr.push(obj);

            this.setState({
              dinexArr: dinexArr,
            });
          }
        }
      }
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getDinex();
    this.setState({refreshing: false});
  }

  componentDidMount() {
    this.getDinex();
  }

  details = (obj) => {
    console.log(obj);
    this.props.navigation.navigate('Details', {obj: obj});
  }

  paymentString(obj) {
    var str = "Accepts ";
    var payments = [];
    if (obj.venmoCash["0"].checked) {
      payments.push("Venmo");
    }
    if (obj.venmoCash["1"].checked) {
      payments.push("Cash");
    }
    if (payments.length > 1) {
      return (str + "Venmo and Cash");
    } else {
      return (str + payments[0])
    }
  }

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >

        <List>
          {this.state.dinexArr.map((obj) => (
            <ListItem
              key={Math.random()}
              onPress={() => this.details(obj)} >
              <Body>
                <Text style={{fontWeight: "bold"}}>{obj.name}</Text>
                <Text note>{this.paymentString(obj)}</Text>
              </Body>
              <Right>
                <Text note>{"$ " + obj.dinex}</Text>
              </Right>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default Dinex;
