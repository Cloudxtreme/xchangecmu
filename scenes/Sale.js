import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TextInput} from 'react-native';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Divider } from 'react-native-elements';

import * as firebase from 'firebase';

import {Container, Header, Content, Segment, Left,
        Right, Icon, Item, Input, Label, H1,
        Body, List, ListItem, Button, Tab, Tabs, TabHeading, Form} from 'native-base';

import { Ionicons } from '@expo/vector-icons';
import keys from './keys.json'

import SelectInput from 'react-native-select-input-ios';
import CheckBox from 'react-native-check-box'

const rootRef = firebase.database().ref();
const UsersRef = rootRef.child('users');

//Page to post a sale
//Can pick between posting dinex or blocks
class Sale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      block: 'block',
      dataArray: [],
      userInfo: {},
      description: "",
      dinex: "",
      name: ""
    };
  }

  componentDidMount() {
    this.loadData();
    var user = firebase.auth().currentUser;

    this.setState({
      userInfo: user
    })

    this.setState({
      name: user.displayName
    })
  }

  loadData() {
    this.setState({
        dataArray: keys
    })
  }

  onClick(data) {
      data.checked = !data.checked;
  }

  renderCheckBox(data) {
    var leftText = data.name;
    return (
      <CheckBox
          style={{flex: 1, padding: 10}}
          onClick={()=>this.onClick(data)}
          isChecked={data.checked}
          leftText={leftText}
      />);
  }

  getPickerOptions() {
    return [
      { value: 'block', label: 'Block'},
      { value: 'dinex', label: 'Dinex'}
    ];
  }

  onSubmit(value) {
    this.setState({
      block: value
    });
  }

  renderView() {
    var len = this.state.dataArray.length;
    var views = [];
    for (var i = 0; i < len; i += 1) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
              {this.renderCheckBox(this.state.dataArray[i])}
          </View>
          <View style={styles.line}/>
        </View>
      )
    }
    return views;
  }

  postNow = () => {
    if ((this.state.dataArray[0].checked
      || this.state.dataArray[1].checked)
      && this.state.description != "") {
      this.props.navigation.dispatch(NavigationActions.back());

      temp = {};
      temp['block'] = this.state.block;
      temp['venmoCash'] = this.state.dataArray;
      temp['description'] = this.state.description;
      temp['dinex'] = this.state.dinex;
      temp['name'] = this.state.name;

      UsersRef.child(this.state.userInfo.uid).push(temp);
    } else {
      alert('Select a form of payment');
      return;
    }
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <Container style =  {styles.container} >
        <Content>
          <View style = {styles.heading}>
            <H1>{this.state.name}</H1>
          </View>

          <View style = {styles.heading}>
            <SelectInput
                value={this.state.block}
                options={this.getPickerOptions()}
                onCancelEditing={() => console.log('onCancel')}
                onSubmitEditing={this.onSubmit.bind(this)}
                style={[styles.selectInput, styles.selectInputSmall]}
              />
          </View>

          <ListItem itemDivider>
            <Text>If selling Dinex, enter amount you're selling</Text>
          </ListItem>
          <View style = {styles.heading}>
            <Item
              style={{height: 40, width: 70, marginBottom: 10,
                alignItems: 'center', justifyContent: 'center'}}>
              <Input
                keyboardType = "number-pad"
                placeholder="$"
                onChangeText = {(dinex) => this.setState({dinex})}
              />
            </Item>
          </View>

          <ListItem itemDivider>
            <Text>Select forms of payment you will accept</Text>
          </ListItem>
          {this.renderView()}

          <Form style = {styles.form}>
            <Item floatingLabel>
              <Label>
                Description
              </Label>
              <Input
                autocorrect = {false}
                onChangeText = {(description) => this.setState({description})}
              />
            </Item>
          </Form>

          <Button block
            success
            style = {styles.buttonSelect}
            onPress = {this.postNow}>
            <Text style = {{color: 'white'}} >Post</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const MARGIN_SMALL = 8;
const MARGIN_LARGE = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 35
  },
  buttonSelect: {
    marginTop: 45
  },
  heading: {
    alignItems: 'center',
    flex: 1
  },
  selectInput: {
    flexDirection:            'row',
    height:                   36,
    borderRadius:             4,
    padding:                  MARGIN_SMALL,
    marginTop:                MARGIN_LARGE,
    marginBottom:                MARGIN_LARGE,
    backgroundColor:          '#dddddd',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectInputSmall: {
    width:                    SCREEN_WIDTH * 0.5 - (MARGIN_LARGE * 2),
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  item: {
    flexDirection: 'row',
  },
  form: {
    marginTop: MARGIN_LARGE,
  },
});

export default Sale;
