import React, {Component} from 'react';
import {View, Text} from 'react-native';

class First extends React.Component{
  navSecond(){
    this.props.navigator.push({
      id: 'second'
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        titleColor={'#FFFFFF'}/>
        <TouchableHighlight onPress={this.navSecond.bind(this)}>
          <Text>Navigate to second screen</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
