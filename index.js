
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Scene,
  Router,
  Actions
} from 'react-native-router-flux';

import App from './App';
import Root from './root';
import Login from './login';
import Register from './register';

export default class react_proto extends Component{
  render(){
    return(
      <Router>
        <Scene key ="root">
          <Scene key="Root" initial component={Root} title="root" />
          <Scene key="Login" component={Login} title="Login" />
          <Scene key="Register" component={Register} title="Register" />
          <Scene key="App" component={App} title="Home" />
        </Scene>
      </Router>
    )
  }
}

AppRegistry.registerComponent('react_proto', () => react_proto);
