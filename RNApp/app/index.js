import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Button from './button';

import DDPClient from 'ddp-client';
let ddpClient = new DDPClient({
  host : "192.168.1.3", // Meteor server ip
  port : 3000,
  ssl : false,
  autoReconnect : true,
  autoReconnectTimer : 500,
  maintainCollections : true,
  ddpVersion : '1',
  socketConstructor: WebSocket
});

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
      posts: {}
    }
  },

  componentDidMount() {
    ddpClient.connect((err, wasReconnect) => {
      let connected = true;
      if (err) connected = false;

      this.setState({ connected: connected });
    });
  },

  handleIncrement() {
    console.log('inc');
  },

  handleDecrement() {
    console.log('dec');
  },

  render() {
    let count = 11;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
      },
      center: {
        alignItems: 'center'
      }
    });
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text>Posts: {count}</Text>
          <Button text="Increment" onPress={this.handleIncrement}/>
          <Button text="Decrement" onPress={this.handleDecrement}/>
        </View>
      </View>
    );
  }
});
