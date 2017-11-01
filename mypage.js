import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

const ACCESS_TOKEN = 'access_token';

export default class Mypage extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      email: "",
      errors: [],
      accessToken: this.props.accessToken
    }
  }

  componentWillMount(){
    this.fetchUserData();
  }

  async fetchUserData(){
    let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);

    console.log(access_token);
    try{
      let response = await fetch('http://localhost:3000/api/v1/users/' + access_token);
      let userData = await response.json();
      if(response.status >= 200 && response.status < 300){
        for(let data in userData){
          console.log("data is: " + data);
          this.setState({[data]: userData[data]});
        }
      }else{
        let error = userData;
        throw err;
      }
    }catch(error){
      console.log("Something wrong");
    }
  }

  render(){
    return(
      <View style={ styles.container }>
        <Text style={ styles.heading }>
          Account Details
        </Text>
        <Text>{ this.state.name }</Text>
        <Text>{ this.state.email }</Text>

        <TouchableHighlight onPress={ Actions.Add_product } style={styles.button}>
          <Text style={ styles.buttonText }>
            Add_product
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
