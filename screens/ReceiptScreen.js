import React, { useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Button } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

const ReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);

        const renderList = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price.toString()} e</Text>
            </View>
        )
    }


    return (
        <View>
                <Text>ReceiptScreen</Text>
                <Text>{ app.state.singleReceipt.total.toString() }</Text>
                <Text>{ app.state.singleReceipt.date }</Text>
                <FlatList
                data={app.state.singleReceipt.products}
                renderItem={(item) => renderList(item)}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default ReceiptScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    itemName: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    itemPrice: {
        padding: 20,
        fontSize: 15,
        marginLeft: 20,
    },
    listContainer: {

    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        //alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
        flex: 1,
    },
});  