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
  ListItem,
  List
} from 'native-base';

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
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }

  }

  storeToken(responseData){
    AsyncStorage.setItem(ID, responseData, (err)=>{
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("success");
    }).catch((err)=>{
      console.log("error is: " + err);
    });
  }

  componentWillMount(){
    this.getToken();
    this.getProducts();
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

  async getProducts(){
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

  goProducts(rowData){
    Actions.Product({product_id: rowData.id});
  }

  renderRow(rowData){
    return (
        <View>
          <Text>name:{rowData.name}</Text>
          <Image
            source={{uri: 'http://2b1f8912.ngrok.io' + rowData.image.url}}
          />

          <Text>term:{rowData.term}</Text>
          <Text>region:{rowData.region}</Text>
          <Text>description:{rowData.description}</Text>

        </View>

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
      <View style={ styles.container }>
        {flashMessage}
        <Text style={ styles.title }>一覧</Text>

        <TouchableHighlight onPress={ Actions.Mypage } style={styles.button}>
          <Text style={ styles.buttonText }>
            Mypage
          </Text>
        </TouchableHighlight>

        <ListView
           style = { styles.listview }
           dataSource={ this.state.dataSource }
           renderRow={ (rowData)=>
             <ListItem button onPress={()=> { this.goProducts(rowData) } }>
             <View>
               <Text>name:{rowData.name}</Text>
               <Image
                 style={{width: 200, height: 100}}
                 source={{uri: 'http://localhost:3000' + rowData.image.url}}
               />

               <Text>term:{rowData.term}</Text>
               <Text>region:{rowData.region}</Text>
               <Text>description:{rowData.description}</Text>

             </View>
             </ListItem>
           }
         />

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
  },
  listview: {
    alignSelf: "stretch"
  }
});
