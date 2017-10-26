import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

export default class Add_product extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      image: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?201707261039",
      term: "",
      region: "",
    }
  }

  async upload_product(){
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('image', this.state.image);
    formData.append('term', this.state.term);
    formData.append('region', this.state.region);
    fetch('http://localhost:3000/api/v1/products',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: formData
    });
  }

  render(){
    return(
      <View style={ styles.container }>
      <TextInput
        onChangeText={ (text) => this.setState({ name: text })}
        style={ styles.input } placeholder="Name">
      </TextInput>
      <TextInput
        onChangeText={ (text) => this.setState({ term: text })}
        style={ styles.input } placeholder="Term">
      </TextInput>
      <TextInput
        onChangeText={ (text) => this.setState({ region: text })}
        style={ styles.input } placeholder="region">
      </TextInput>

      <TouchableHighlight onPress={ this.upload_product.bind(this)} style={ styles.button}>
        <Text style={ styles.buttonText}>
          Register
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
