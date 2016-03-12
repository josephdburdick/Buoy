import React, {
  AppRegistry,
  Component
} from 'react-native';

import App from './app';

class Buoy extends Component {
  render() {
    return <App />;
  }
}
AppRegistry.registerComponent('Buoy', () => Buoy);
