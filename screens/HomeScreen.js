import React, { useEffect, useContext } from 'react';
import { Text, View, Button } from 'react-native';
import AppContext from '../AppContext';

const db = [
    {
      name: 'ruoka',
      hinta: 5,
      id: 0
    },
    {
      name: 'vesi',
      hinta: 1,
      id: 1
    },
    {
      name: 'olut',
      hinta: 3,
      id: 2
    },
    {
      name: 'kannabis',
      hinta: 20,
      id: 3
    },
    {
      name: 'kiasma-opiskelija',
      hinta: 13,
      id: 4
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
                    title="Create a new receipt"
                    onPress={() => navigation.navigate('NewReceipt')}
                />
                <Button
                    title="Add more items"
                    onPress={() => navigation.navigate('AddMoreItems')}
                />
        </View>
    )
}

export default HomeScreen