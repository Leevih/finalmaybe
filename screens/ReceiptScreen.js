import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Text, Button } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

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
                <Text>{ app.state.singleReceipt.total.toString() } euros</Text>
                <Text>{ moment(app.state.singleReceipt.date).format('DD/MM/YYYY HH:mm') }</Text>
                <FlatList
                data={app.state.singleReceipt.products}
                renderItem={(item) => renderList(item)}
                keyExtractor={item => item._id + Math.random()}
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