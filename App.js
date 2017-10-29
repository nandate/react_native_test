/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

const ACCESS_TOKEN = 'access_token';

export default class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: "",
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

  }

  componentWillMount(){
    this.getToken();
    this.getProblems();
  }

  async getToken(){
    try{
      let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
      if(!accessToken){
        Actions.Login();
      }else{
        this.setState({ accessToken: accessToken});
      }
    }catch(error){
      console.log("Something went wrong");
      Actions.Login();
    }
  }

  async getProblems(){
    try{
      let response = await fetch('http://localhost:3000/api/v1/products/');
      console.log(response);
      console.log(response.typeof);
      let res = await response.json();
      console.log(res);
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ dataSource: this.state.dataSource.cloneWithRows(res) });
      console.log(this.state.dataSource);
    }catch(error){
      console.log("error: " + error);
    }
  }

  async deleteToken(){
    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      Actions.Root();
    }catch(error){
      console.log("Something went wrong");
    }
  }

  onLogout(){
    this.setState({showProgress: true});
    this.deleteToken();
  }


  async onDelete(){
    let access_token = this.state.accessToken;
    try{
      let response = await fetch('http://localhost:3000/api/v1/users/' + access_token,{
        method: 'DELETE'
      });
      let res = await response.text();
      if(response.status >= 200 && response.status < 300){
        console.log("Success sir: " + res);
        Actions.Root();
      }else{
        let error = res;
        throw error;
      }
    }catch(error){
      console.log("error: " + error);
    }
  }

  renderRow(rowData){
    return (

      <TouchableHighlight onPress = { Actions.Mypage }>
        <View>
          <Text>{rowData.name}</Text>
          <Image
            source={{uri: 'http://2b1f8912.ngrok.io' + rowData.image.url}}
          />

          <Text>{rowData.term}</Text>
          <Text>{rowData.region}</Text>
          <Text>{rowData.description}</Text>
        </View>
      </TouchableHighlight>

    );
  }

  render() {
    let flashMessage;
    if (this.props.flash) {
       flashMessage = <Text style={styles.flash}>{this.props.flash}</Text>
    } else {
       flashMessage = null
    }

    return (
      <View style={styles.container}>
        {flashMessage}
        <Text style={ styles.title }> Welcome User </Text>
        <Text style={ styles.text }> Your new token is { this.state.accessToken }</Text>

        <ListView
           dataSource={ this.state.dataSource }
           renderRow={ this.renderRow }
         />

         <Image
           style={{width: 50, height: 50}}
           source={{uri: 'http://2b1f8912.ngrok.io/uploads/product/image/7/image.png'}}
         />


        <TouchableHighlight onPress={ this.onLogout.bind(this) } style={ styles.button }>
          <Text style={ styles.buttonText }>
            Logout
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ Actions.Mypage } style={styles.button}>
          <Text style={ styles.buttonText }>
            Mypage
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    marginBottom: 30
  },
  button: {
    height: 50,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  flash: {
    height: 40,
    backgroundColor: '#00ff00',
    padding: 10,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20
  }
});
