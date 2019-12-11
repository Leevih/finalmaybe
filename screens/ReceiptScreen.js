import React, { useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Text, Button } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';

import receiptService from '../services/receipt-service';

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

    const handleDelete = () => {
        const id = app.state.singleReceipt._id;
        receiptService
        .deleteItem(id)
        .then(res => {
            console.log(res.data)
            app.dispatch({ type: 'DELETE_RECEIPT', payload: id });
            navigation.navigate('ViewAllReceipts');
        })
        .catch(error => {
            console.log(error);
        });
    };


    return (
        <View style={styles.main}>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: '2%', marginLeft: '2%' }}>
                <View>
                    <Text>Total cost: {app.state.singleReceipt.total.toFixed(2).toString()} euros</Text>
                    <Text>Date: {moment(app.state.singleReceipt.date).format('DD/MM/YYYY HH:mm')}</Text>
                </View>
                <Button
                    onPress={handleDelete}
                    style={styles.button}>
                    <Text>
                        DELETE
                    </Text>
                </Button>
            </View>
            <FlatList
                style={styles.list}
                data={app.state.singleReceipt.products}
                renderItem={(item) => renderList(item)}
                keyExtractor={item => item._id + Math.random()}
            />
        </View>
    )
}

export default ReceiptScreen;


const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        paddingTop: 22
    },
    itemName: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#F7F7F7'
    },
    itemPrice: {
        padding: 20,
        fontSize: 15,
        marginLeft: 20,
        backgroundColor: '#E3E3E3'
    },
    list: {
        marginTop: '2%',
        marginBottom: '9%'
    },
    button: {/* 
        width: '20%', */
        marginLeft: '2%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
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