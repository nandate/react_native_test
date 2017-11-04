import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
  Button
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import ImagePicker from 'react-native-image-picker'



const ACCESS_TOKEN = 'access_token';
let options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Add_product extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      image_uri: "",
      term: "",
      region: "",
      description: "",
    }
  }

  async upload_product(){
    let formData = new FormData();
    let access_token = await AsyncStorage.getItem(ACCESS_TOKEN)
    formData.append('name', this.state.name);
    formData.append('image', {
      uri: this.state.image_uri,
      type: 'image/png',
      name: 'image.png'
    });
    formData.append('term', this.state.term);
    formData.append('region', this.state.region);
    formData.append('description', this.state.description);
    formData.append('access_token', access_token);
    console.log(formData);
    fetch('http://localhost:3000/api/v1/products',{
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data; boundary=05329b89-39a0-4035-8cc3-d76e99a00ae8',
        'accept-encoding': 'gzip',
        'user-agent': 'okhttp/3.6.0'
      },
      body: formData
    });
  }

  pickImage(){
    ImagePicker.launchImageLibrary(options, (response)  => {
      let source = response.uri;
      this.setState({image_uri: source});
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
      <TextInput
        onChangeText={ (text) => this.setState({ description: text })}
        style={ styles.input } placeholder="description">
      </TextInput>
      <Button
        onPress={ this.pickImage.bind(this) }
        title="カメラロールから写真を選択"/>

      <TouchableHighlight onPress={ this.upload_product.bind(this)} style={ styles.button}>
        <Text style={ styles.buttonText}>
          出品
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
