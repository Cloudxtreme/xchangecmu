import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Constants } from 'expo';

import * as firebase from 'firebase';

import {Container, Header, Content, Segment, Left, Right, Icon,
        Body, List, ListItem, Button, Tab, Tabs, TabHeading, } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import Dinex from './Dinex';
import Blocks from './Blocks';


class Feed extends Component {
  postNow = () => {
    this.props.navigation.navigate('Post');
  };

  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={ <TabHeading><Text>Dinex</Text></TabHeading>}>
            <Dinex navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={ <TabHeading><Text>Blocks</Text></TabHeading>}>
            <Blocks navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
        <Button
          full
          success
          onPress = {this.postNow}>
          <Text style = {{color: 'white'}}>Post a Sale</Text>
        </Button>
      </Container>
    );
  }
}

export default Feed;
