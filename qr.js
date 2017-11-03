import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';

import QRcode from 'react-native-qrcode';

export default class qr extends Component{
  constructor(props){
    super(props)
    this.state = {
      name: "",
      isLoading: true
    }
  }

  componentWillMount(){
    this.setState({ name: this.props.name });
  }

  render(){
    return(
      <View style={ styles.container }>
        <QRcode
          value={ this.state.name }
          size={ 200 }
        />
      </View>
    )
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
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});
