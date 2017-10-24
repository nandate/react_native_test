
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';

export default class Root extends Component{

  componentWillMount(){
    this.getToken();
  }

  static navigationOptions = {
    title: "root"
  };

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
      let response = await fetch('http://localhost:3000');
      let res = await response.text();
      if(response.status >= 200 && response.status < 300){
        this.navigate('app');
      }else{
        let error = res;
        throw error;
      }
    }catch(error){
      console.log("error response: " + error);
    }
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={ styles.container }>
        <Text style={ styles.title }> Welcome Friend </Text>
        <TouchableHighlight  onPress={()=> navigate('Register')} style={ styles.button}>
          <Text style={ styles.buttonText }>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight  onPress={()=> navigate('Login')} style={ styles.button}>
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
