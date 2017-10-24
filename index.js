
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import App from './App';
import Root from './root';
import Login from './login';
import Register from './register';

export const BasicApp = StackNavigator({
  Root: { screen: Root},
  Login: { screen: Login},
  Register: { screen: Register}
});

class react_proto extends Component{
  render(){
    return(
      <Text>Hello</Text>
    );
  }
}

AppRegistry.registerComponent('react_proto', () => BasicApp);
