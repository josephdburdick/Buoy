import React, {Component} from 'react';
import {View, Text} from 'react-native';

class Second extends React.Component{
  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid style={styles.toolbar}
                        title={this.props.title}
                        navIcon={this.props.title}
                        onIconClicked={this.props.navigator.pop}
                        titleColor={'#FFFFFF'}/>
        <Text>
          Second screen
        </Text>
      </View>
    );
  }
}
