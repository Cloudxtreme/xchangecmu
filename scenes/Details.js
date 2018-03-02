import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import {Card, CardItem, Text, Body, Header } from 'native-base';

export default class Details extends Component {

  //Determine what to display
  dinexOrBlock(obj) {
    if (obj.block != null && obj.block == "block") {
      return ("1 Block");
    }
    if (obj.block != null){
      return ("$ " + obj.dinex);
    }
  }

  render() {
    //Get obj passed in from blocks or dinex
    const {obj} = this.props.navigation.state.params;

    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: "https://www.cmu.edu/idplus/images/graphics/plaidcash.png"}}
          featured
          title={this.dinexOrBlock(obj)}
          caption={obj.name}
        />

        <Card>
          <CardItem>
            <Body>
              <Text>
                {obj.description}
              </Text>
            </Body>
          </CardItem>
         </Card>
      </ScrollView>
    );
  }
}
