import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Text, Button } from 'native-base';
import productsService from '../services/produt-service.js';
import receiptService from '../services/receipt-service.js';


const HomeScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    useEffect(() => {
      productsService
      .getAll()
      .then(res => {
        app.dispatch({ type: 'SET_ITEMS', payload: res.data })
        console.log(res.data)
      })

      receiptService
      .getAll()
      .then(res => {
        app.dispatch({ type: 'SET_RECEIPTS', payload: res.data});
      })

    }, [])

    return (
        <View style={styles.container}>
                <Button style={styles.button} primary
                    onPress={() => navigation.navigate('NewReceipt')}
                >
                  <Text>Create a new receipt</Text>
                </Button>
                <Button style={styles.button}
                    onPress={() => navigation.navigate('AddMoreItems')}
                >
                  <Text>Add more items</Text>
                </Button>
                <Button style={styles.button}
                  onPress={() => navigation.navigate('ViewAllReceipts')}
                >
                    <Text>All receipts</Text>
                </Button>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 22,
      width: '90%',
      marginLeft: '5%',
  },
  button: {
    margin: '2%',
  }
});

export default HomeScreen