import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Query } from 'react-apollo';
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
//import UserDataList from './UserDataList';

// const REPOS_QUERY = gql`
// query repoQuery($after: String) {
//         query {
//           info {
//              count
                // pages
                // next
                // prev
//           }
//           results(first: 5, isFork: true, after: $after) {
              // id
              // name
              // species
              // type
              // status
              // location {
              //   name
              // }
              // origin {
              //   name
              // }
              // gender
              // image
//           }
//               cursor
//         }
// pageInfo {
//   endCursor
//   hasNextPage
// }
//       }
// `;

class FlatListDemo extends Component {

  static navigationOptions = {
    title: 'Characters List',
  };
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }


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
        this.arrayholder = res.results;
        console.log("data-----", this.arrayholder)
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  alertItemName = (item) => {
    alert("Name - " + item.name + "\n" 
    + "Status - " + item.status + "\n" 
    + "Species - " + item.species + "\n"
    + "Species - " + item.gender + "\n" 
    + "Species - " + item.origin.name + "\n" 
    + "Species - " + item.location.name + "\n" )
 }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {

    // const { data, error, loading, fetchMore } = useQuery(REPOS_QUERY, {
    //   variables: { after: null }
    // });
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            
            <ListItem titleStyle={{flex: 1, marginLeft: 20, paddingLeft: 10}}
            subtitleStyle={{flex: 1, marginLeft: 20, paddingLeft: 10}}
              leftAvatar={{ source: { uri: item.image },
              onPress: () => this.alertItemName(item) 
            }}
              title={item.name}
              rightAvatar={{
                source: {uri: require('./rightArrow.png')},
                showEditButton: false,
                size: "small",
                overlayContainerStyle: { backgroundColor: "white" },
                onPress: () => {this.alertItemName(item),
                 { data: { item } }}
              }}   
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo