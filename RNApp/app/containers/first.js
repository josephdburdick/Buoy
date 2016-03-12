import React, {Component} from 'react';
import {
  View,
  Text,
  ToolbarAndroid,
  TouchableHighlight
} from 'react-native';

export default class First extends Component{
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    });
  }
  render() {
    return (


          <Text>Navigate to second screen</Text>

      
    );
  }
}
