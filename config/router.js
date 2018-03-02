import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import Login from '../scenes/Login';
import Main from '../scenes/Main';
import Feed from '../scenes/Feed';
import Sale from '../scenes/Sale';
import SignUp from '../scenes/SignUp';
import Details from '../scenes/Details';

export const MainViewStack = StackNavigator({
  Login : {
    screen: Login,
  },
}, {
  headerMode: 'none',
});

export const FeedStack = StackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      title: 'XChangeCmu',
    },
  },
  Details: {
    screen: Details,
    navigationOptions: {
      title: 'Details',
    },
  },
  Post: {
    screen: Sale,
    navigationOptions: {
      title: 'Post a Sale',
    },
  },
});

export const Tabs = TabNavigator({
  Feed: {
    screen: FeedStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-list" size={32} color={tintColor} />
    },
  },
  User: {
    screen: Main,
    navigationOptions: {
      title: 'Account',
      tabBarLabel: 'Account',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={32} color={tintColor} />
    },
  },
});

export const Root = StackNavigator({
  Login : {
    screen: MainViewStack,
  },
  SignUp : {
    screen: SignUp,
  },
  Tabs: {
    screen: Tabs,
  },
}, {
  headerMode: 'none',
});
