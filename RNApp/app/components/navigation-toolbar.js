var React = require('react-native');
var {
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} = React;

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push(newRandomRoute())}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title} [{index}]
      </Text>
    );
  },

};

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
}

const NavigationToolbar = React.createClass({

  componentWillMount: function() {
    var navigator = this.props.navigator;

    var callback = (event) => {
      console.log(
        `NavigationToolbar : event ${event.type}`,
        {
          route: JSON.stringify(event.data.route),
          target: event.target,
          type: event.type,
        }
      );
    };

    // Observe focus change events from this component.
    this._listeners = [
      navigator.navigationContext.addListener('willfocus', callback),
      navigator.navigationContext.addListener('didfocus', callback),
    ];
  },

  componentWillUnmount: function() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={newRandomRoute()}
        renderScene={(route, navigator) => (
          <ScrollView style={styles.scene}>
            <Text style={styles.messageText}>{route.content}</Text>
            <NavButton
              onPress={() => {
                navigator.immediatelyResetRouteStack([
                  newRandomRoute(),
                  newRandomRoute(),
                  newRandomRoute(),
                ]);
              }}
              text="Reset w/ 3 scenes"
            />
            <NavButton
              onPress={() => {
                this.props.navigator.pop();
              }}
              text="Exit NavigationBar Example"
            />
          </ScrollView>
        )}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  },

});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

export default NavigationToolbar;
