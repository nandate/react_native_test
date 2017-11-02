import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
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
import ScrollableTabView from 'react-native-scrollable-tab-view';

const ACCESS_TOKEN = 'access_token';

export default class Mypage extends Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      email: "",
      errors: [],
      accessToken: this.props.accessToken,
      borrowed_dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      sold_dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  }

  componentWillMount(){
    this.fetchUserData();
    this.fetchBorrowedProductData();
    this.fetchSoldProductData();
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

  async fetchBorrowedProductData(){
    try{
      let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
      let response = await fetch('http://localhost:3000/api/v1/users/' + access_token + "/borrowed_products");;
      let res = await response.json();
      console.log(res);
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ borrowed_dataSource: this.state.borrowed_dataSource.cloneWithRows(res) });
    }catch(error){
      console.log("error: " + error);
    }
  }

  async fetchSoldProductData(){
    try{
      let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
      let response = await fetch('http://localhost:3000/api/v1/users/' + access_token + "/sold_products");;
      let res = await response.json();
      console.log(res);
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({ sold_dataSource: this.state.sold_dataSource.cloneWithRows(res) });
    }catch(error){
      console.log("error: " + error);
    }
  }

  onLogout(){
    this.setState({showProgress: true});
    this.deleteToken();
  }

  async deleteToken(){
    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      Actions.Root();
    }catch(error){
      console.log("Something went wrong");
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

        <ScrollableTabView>
          <ListView tabLabel="借りた物"
            dataSource={ this.state.borrowed_dataSource }
            renderRow={ (rowData) =>
              <ListItem onPress={ ()=> { Actions.Product({product_id: rowData.id}) } }>
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

          <ListView tabLabel="貸した物"
          dataSource={ this.state.sold_dataSource }
            renderRow={ (rowData) =>
              <ListItem onPress={ ()=> { Actions.Product({product_id: rowData.id}) } }>
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
        </ScrollableTabView>

        <TouchableHighlight onPress={ Actions.Add_product } style={styles.button}>
          <Text style={ styles.buttonText }>
            Add_product
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.onLogout.bind(this) } style={ styles.button }>
          <Text style={ styles.buttonText }>
            Logout
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
