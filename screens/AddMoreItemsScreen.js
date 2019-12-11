import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import React, { useState, useContext } from 'react';
import AppContext from '../AppContext';
import { Text, Button } from 'native-base';

import productService from '../services/produt-service';

const AddMoreItemsScreen = () => {
    const app = useContext(AppContext);
    const [hasData, setHasData] = useState(false);
    const [textField, setTextField] = useState('');
    const [textFieldPrice, setTextFieldPrice] = useState('');

    const storeData = () => {
        const myData = {
            title: textField,
            price: parseFloat(textFieldPrice.replace(/,/g, '.')),
        }

        productService
            .postItem(myData)
            .then(res => {
                app.dispatch({ type: 'ADD_NEW_ITEM', payload: res.data })
                console.log(res.data);
            });

        setTextField('');
        setTextFieldPrice(0);
        setHasData(true)
        //console.log(app.state.newItems)
    }

    const handleRemove = (item) => {
        productService
            .deleteItem(item)
            .then(res => {
                app.dispatch({ type: 'REMOVE_THIS_FROM_ALL', payload: item });
                console.log(res.data);
            });
    }


    const renderList = ({ item }) => {
        return (
            <View>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price.toString()} e</Text>
                <Button style={styles.listButton}
                    onPress={() => handleRemove(item)}>
                    <Text>Remove</Text>
                </Button>
            </View>
        )
    }

    return (
        <View>
            <View style={styles.main}>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: '2%', marginLeft: '2%' }}>
                    <View>
                        <TextInput style={styles.input}
                            onChangeText={event => setTextField(event)}
                            value={textField}
                            placeholder="Title"
                        />

                        <TextInput style={styles.input}
                            onChangeText={event => setTextFieldPrice(event)}
                            value={textFieldPrice.toString()}
                            keyboardType={'numeric'}
                            placeholder="Price"
                        />
                        <Button onPress={() => storeData()}>
                            <Text>Save this instance</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        style={styles.list}
                        data={app.state.allItems}
                        renderItem={(item) => renderList(item)}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
        </View>
    )
};


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
        marginBottom: '18%'
    },
    button: {/* 
        width: '20%', */
        marginLeft: '2%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    listContainer: {
        paddingBottom: '25%',
    },
    input: {
        height: 60
    }
});
export default AddMoreItemsScreen;