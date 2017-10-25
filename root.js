
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';


const ACCESS_TOKEN = 'access_token';

export default class Root extends Component{

  componentWillMount(){
    this.getToken();
  }

  async getToken(){
    try{
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken){
        console.log("Token not set");
      }else{
        this.verifyToken(accessToken);
      }
    }catch(error){
      console.log("Something went wrong");
    }
  }

  async verifyToken(token){
    let accessToken = token;

    try{
      let response = await fetch('http://localhost:3000/api/v1/verify?session%5Baccess_token%5D='+accessToken);
      let res = await response.text();
      if(response.status >= 200 && response.status < 300){
        navigate('App');
      }else{
        let error = res;
        throw error;
      }
    }catch(error){
      console.log("error response: " + error);
    }
  }
  render(){
    return(
      <View style={ styles.container }>
        <Text style={ styles.title }> Welcome Friend </Text>
        <TouchableHighlight  onPress={ Actions.Register } style={ styles.button}>
          <Text style={ styles.buttonText }>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight  onPress={ Actions.Login } style={ styles.button}>
          <Text style={ styles.buttonText }>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});
