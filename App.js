import React, { useReducer, useEffect, useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/HomeScreen';
import NewReceiptScreen from './screens/NewReceiptScreen';
import ReviewReceiptScreen from './screens/ReviewReceiptScreen';
import AddMoreItemsScreen from './screens/AddMoreItemsScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import AllReceiptsScreen from './screens/AllReceiptsScreen';


import { AppProvider } from './AppContext';
import appReducer from './appReducer';

import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';


const initialState = {
  selectedItems: [],
  allItems: [],
  newItems: [],
  allReceipts: [],
  singleReceipt: {},
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ei mitään helvetin hajua saako näin tehdä :DDD
    // En vaan siedä noita luokkakomponentteja
    async function load() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      setIsLoading(false);
    }
    load();

  }, [])

  if (isLoading) {
    return (
      <AppLoading />
    )
  } else {
    return (
      <AppProvider value={{ state, dispatch }}>
        <AppContainer />
      </AppProvider>
    );
  }

}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    NewReceipt: NewReceiptScreen,
    ReviewReceipt: ReviewReceiptScreen,
    AddMoreItems: AddMoreItemsScreen,
    ViewAllReceipts: AllReceiptsScreen,
    SingleReceipt: ReceiptScreen,
  },
  {
    initialRouteName: 'Home',
  }
)

const AppContainer = createAppContainer(AppNavigator)

export default App;

