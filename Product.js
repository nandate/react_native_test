import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  Image
} from 'react-native';

import {
  ListItem,
  List
} from 'native-base';

import {
  Actions,
} from 'react-native-router-flux';


const ACCESS_TOKEN = 'access_token';
const ID = 'id';

export default class Product extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
      nextid: this.props.nextid
    }
  }

  async rent(){
    console.log("rent!");
    let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
    try{
      let response = await fetch('http://localhost:3000/api/v1/products/' + id + '/rent',{
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: access_token
        })
      });
    }catch(error){

    }

  }

  render(){
    return(
      <View>
        <Text>{this.state.nextid}</Text>

        <TouchableHighlight onPress={ this.rent.bind()} style={styles.button}>
          <Text style={ styles.buttonText }>
            rent
          </Text>
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
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});
