import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import AppContext from '../AppContext';
import { Text, Button } from 'native-base';

const NewReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    const renderList = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price.toString()} e</Text>
                <Button style={styles.listButton}
                    onPress={() => app.dispatch({ type: 'ADD_THIS', payload: item })}>
                    <Text>Add</Text>
                </Button>
                <Button style={styles.listButton}
                    onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item })}>
                    <Text>Remove</Text>
                </Button>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button onPress={() => navigation.navigate('ReviewReceipt')}>
                <Text>Preview your receipt</Text>
            </Button>
             <FlatList
                data={app.state.allItems}
                renderItem={(item) => renderList(item)}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default NewReceiptScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    itemName: {
        paddingTop: 5,
        fontSize: 18,
        height: 44,
    },
    itemPrice: {
        paddingBottom: 5,
        fontSize: 15,
        marginLeft: 20,
    },
    listContainer: {
        width: '90%',
        marginLeft: '5%',
        justifyContent: 'center'
    },
    listButton: {
        marginBottom: '1%',
         width: '50%',
        marginLeft: '25%',
        justifyContent: 'center'
    }
});  