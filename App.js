import React, { Component } from 'react';
import { Root, Tabs  } from './config/router';

export default class App extends Component {

  render() {
    console.disableYellowBox = true;
    return <Root/>;
  }
}
