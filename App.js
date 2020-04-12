import React from 'react';
import UserDetails from './UserDetails.js';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import SearchableFlatList from './SearchableList';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

 

export default function App() {


  return(

  //   <ApolloProvider client={client}>
  //   <AppContainer />
  // </ApolloProvider>

    <AppContainer />
    

  );

}

const AppNavigator = createStackNavigator({
  Home: {
    screen: SearchableFlatList
  },
  UserDetails: {
    screen: UserDetails
  }
});

const AppContainer = createAppContainer(AppNavigator); 

