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

export default class Register extends Component{
  constructor(){
    super();

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: [],
      showProgress: false,
    }
  }

  static navigationOptions = {
    title: "register"
  };

  async storeToken(accessToken){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      console.log("Token was stored successfull");
    }catch(error){
      console.log("Something went wrong");
    }
  }

  async onRegisterPressed(){
    this.setState({ showProgress: true });
    try{
      let response = await fetch('http://localhost:3000/api/v1/users',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user:{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      });
      let res = await response.text();
      console.log(res);
      if(response.status >= 200 && response.status < 300){
        let accessToken = res;
        console.log(accessToken);
        this.storeToken(accessToken);
        Actions.App();
      }else{
        let error = res;
        throw error;
      }
    }catch(error){
      let formErrors = JSON.parse(errors);
      let errorsArray = [];

      for(var key in formErrors) {
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({ errors: errorsArray })
      this.setState({ showProgress: false });
    }
  }

  render(){
    return(
      <View style={ styles.container }>
        <Text style={ styles.heading }>
          Join us now!
        </Text>
        <TextInput
          onChangeText={ (text) => this.setState({ email: text })}
          style={ styles.input } placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text) => this.setState({ name: text })}
          style={ styles.input } placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={ (text) => this.setState({ password: text })}
          style={ styles.input } placeholder="Password" secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text) => this.setState({ password_confirmation: text })}
          style={ styles.input } placeholder="Comfirm Password" secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={ this.onRegisterPressed.bind(this)} style={ styles.button}>
          <Text style={ styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        <Errors errors={ this.state.errors}/>
      </View>
    );
  }
}

const Errors = (props) =>{
  return(
    <View>
      { props.errors.map((error, i)=> <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
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
