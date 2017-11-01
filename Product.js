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

export default class Product extends Component{
  constructor(props){
    super(props);

    this.state = {
      accessToken: "",
      products_id: this.props.id,
      showProgress: false,
      id: "",
      name: "",
      image_url: "",
      term: "",
      region: "",
      description: ""
    }
  }

  componentWillMount(){
    console.log(this.props.id);
    console.log(this.state.id);
    this.fetchProductData();
  }

  async fetchProductData(){
    let product_id = this.props.id;
    try{
      let response = await fetch('http://localhost:3000/api/v1/products/' + product_id);
      let res = await response.text();
      if(response.status >= 200 && response.status < 300){
        let productData = JSON.parse(res);
        for(let data in productData){
          console.log("data is: " + data);
          this.setState({[data]:productData[data]});
        }
      }else{
        let error = res;
        throw err;
      }
    }catch(error){
      console.log(error);
    }
  }

  async rent(product_id){
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
        <Text>{this.state.product_id}</Text>
        <Text>{this.state.id}</Text>
        <Text>{this.state.name}</Text>
        <Text>{this.state.image_url}</Text>
        <Text>{this.state.term}</Text>
        <Text>{this.state.region}</Text>
        <Text>{this.state.description}</Text>

        <TouchableHighlight style={styles.button}>
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
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    marginBottom: 30
  }
});
