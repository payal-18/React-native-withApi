import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';



export default class UserDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
  }
  
    static navigationOptions =
    {
       title: 'Details of User',
    };

    makeRemoteRequest = () => {
      const url = `https://rickandmortyapi.com/api/character/`;
      this.setState({ loading: true });
  
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.setState({
            data: res.results,
            error: res.error || null,
            loading: false,
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    };


  render() {
    console.log("data-----")
    return (
    <View>
      <Text>HIIII</Text>

    </View>
    
    );
  }
}