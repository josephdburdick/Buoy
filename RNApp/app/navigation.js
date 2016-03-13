import React, {Component} from 'react';
import {
  View,
  Text,
  Navigator
} from 'react-native';

import Dashboard from './containers/dashboard';
import First from './containers/first';

export default class Navigation extends Component{
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'dashboard':
      return (<Dashboard navigator={navigator} title="dashboard"/>);
      case 'first':
      return (<First navigator={navigator} title="first" />);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{id: 'dashboard'}}
        renderScene={this.navigatorRenderScene}/>
    );
  }

}
