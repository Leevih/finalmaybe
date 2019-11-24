import React, { useContext, useReducer, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import NewReceiptScreen from './screens/NewReceiptScreen';
import ReviewReceiptScreen from './screens/ReviewReceiptScreen';
import AddMoreItemsScreen from './screens/AddMoreItemsScreen';

import { AppProvider } from './AppContext';
import appReducer from './appReducer';

import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


const initialState = {
  selectedItems: [],
  allItems: []
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      //this.setState({ isReady: true });
  }, [])
  
  return (
      <AppProvider value={{ state, dispatch }}>
        <AppContainer />
      </AppProvider>
  );
}

const AppNavigator = createStackNavigator(
  {
      Home: HomeScreen,
      NewReceipt: NewReceiptScreen,
      ReviewReceipt: ReviewReceiptScreen,
      AddMoreItems: AddMoreItemsScreen,
  },
  {
      initialRouteName: 'Home',
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default App;

