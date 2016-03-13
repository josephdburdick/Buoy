import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import ddpClient from '../ddp';

/*
TODO:
- toolbar
- event list
  • self.subscribe('publicAndUserEvents', Meteor.userId());
- cards
- filters
- map view
*/

export default React.createClass({
  getInitialState() {
   return {
     connected: false,
     events: [],
     user: {}
   };
 },

  // constructor(props) {
  //   super(props);
  //   // this.onChange = this.onChange.bind(this);
  //   this.state = {
  //     connected: false,
  //     user: undefined,
  //     events: []
  //   };
  // }

  componentDidMount() {
    const self = this;
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) {
        connected = false;
      } else {
        ddpClient.user().then((user) => {
          self.setState({ user: user });
          self.makeSubscription();
          self.observeEvents();
        });
      }
      this.setState({ connected: connected });
    });
  },

  observeEvents() {

    let self = this;
    let observer = ddpClient.observe('events');

    observer.added = (id) => {
      self.setState({ events: ddpClient.collections.events });
    };
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      self.setState({ events: ddpClient.collections.events });
    };
    observer.removed = (id, oldValue) => {
      self.setState({ events: ddpClient.collections.events });
    };
  },

  makeSubscription() {
    let self = this;
    ddpClient.subscribe('publicAndUserEvents', [this.state.user._id], () => {
      self.setState({events: ddpClient.collections.events});
    });
  },

  navSecond(){
    this.props.navigator.push({
      id: 'second'
    });
  },
  render() {
    let self = this;
    let count = Object.keys(self.state.events).length;

    let events =  !!!count ? [] : Object.values(self.state.events).map((event, index) => {
      return (
        <TouchableHighlight key={index} onPress={() => console.log('pressed')}>
          <Text id={index}>{event.name}</Text>
        </TouchableHighlight>
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text>Map</Text>
        </View>
        <View style={styles.container}>
          <Text>Filters</Text>
          <Text>{count} Events</Text>
        {events}
        </View>
      </View>
    );
  }
});



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
