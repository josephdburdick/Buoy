import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator
} from 'react-native';

import First from './containers/first';
import Second from './containers/second';

export default class Navigation extends Component{
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'first':
      return (<First navigator={navigator} title="first"/>);
      case 'second':
      return (<Second navigator={navigator} title="second" />);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{id: 'first'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

}
