import React, {
  ScrollView,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import _ from 'lodash';
import Contacts from 'react-native-contacts';

import ddpClient from './ddp';
import Button from './button';

export default React.createClass({
  getInitialState() {
    return {
      connected: false,
      posts: {},
      contacts: []
    }
  },
  handleSignOut() {
    ddpClient.logout(() => {
      this.props.changedSignedIn(false)
    });
  },
  componentDidMount() {
    this.makeSubscription();
    this.observePosts();
  },

  observePosts() {
    let observer = ddpClient.observe('posts');

    observer.added = (id) => {
      this.setState({ posts: ddpClient.collections.posts })
    }
    observer.changed = (id, oldFields, clearedFields, newFields) => {
      this.setState({ posts: ddpClient.collections.posts })
    }
    observer.removed = (id, oldValue) => {
      this.setState({ posts: ddpClient.collections.posts })
    }
  },

  makeSubscription() {
    ddpClient.subscribe("posts", [], () => {
      this.setState({posts: ddpClient.collections.posts});
    });
  },

  handleIncrement() {
    ddpClient.call('addPost');
  },

  handleDecrement() {
    ddpClient.call('deletePost');
  },

  handleSignOut() {
    ddpClient.logout(() => {
      this.props.changedSignedIn(false)
    });
  },

  handleContactRetrieval() {
    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        // x.x
      } else {
        _.each(contacts, (contact) => {
          ddpClient.call('addContact', contact);
        })

        this.setState({contacts: contacts});
      }
    })
  },

  render() {
    let count = Object.keys(this.state.posts).length;
    let contacts = this.state.contacts.map((contact, index) => {
      return (
        <TouchableHighlight key={index} onPress={() => console.log('pressed')}>
          <Text id={index}>{contact.givenName}</Text>
        </TouchableHighlight>
      );
    });
    return (
      <View>
        <Text>Posts: {count}</Text>
        <Button text="Increment" onPress={this.handleIncrement}/>
        <Button text="Decrement" onPress={this.handleDecrement}/>

        <Button text="Sign Out" onPress={() => this.props.changedSignedIn(false)} />

        <Button text="Get Contacts" onPress={this.handleContactRetrieval}/>

        <Text>Contacts</Text>
        <ScrollView>
          {contacts}
        </ScrollView>

      </View>
    );
  }
})
