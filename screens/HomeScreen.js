import React, { useEffect, useContext } from 'react';
import { Text, View } from 'react-native';
import AppContext from '../AppContext';
import { Button } from 'native-base';

const db = [
    {
      key: 'ruoka',
      price: 5,
      id: 0
    },
    {
      key: 'vesi',
      price: 1,
      id: 1
    },
    {
      key: 'olut',
      price: 3,
      id: 2
    },
    {
      key: 'kiasma-opiskelija',
      price: 13,
      id: 3
    },
    {
      key: 'elämä',
      price: 50,
      id: 4
    },
    {
      key: 'koira',
      price: 13,
      id: 5
    },
    {
      key: 'kuolema',
      price: 35,
      id: 6
    },
    {
      key: 'ooppera',
      price: 75,
      id: 7
    },
  ];

const HomeScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    useEffect(() => {
        app.dispatch({ type: 'SET_ITEMS', payload: db })
    }, [])

    return (
        <View>
                <Text>HomeScreen</Text>
                <Button
                    onPress={() => navigation.navigate('NewReceipt')}
                >
                  <Text>Create a new receipt</Text>
                </Button>
                <Button
                    onPress={() => navigation.navigate('AddMoreItems')}
                >
                  <Text>Add more items</Text>
                </Button>
        </View>
    )
}

export default HomeScreen