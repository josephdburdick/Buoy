import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
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
      <View style={styles.container}>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text style={styles.main}>Navigate to second screen</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
