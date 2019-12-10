import { View, TextInput, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AppContext from '../AppContext'
import { Container, Content, List, ListItem, Text, Button, Input, Item, Header } from 'native-base';

import productService from '../services/produt-service';

const AddMoreItemsScreen = () => {
    const app = useContext(AppContext);
    const [hasData, setHasData] = useState(false);
    const [textField, setTextField] = useState('');
    const [textFieldPrice, setTextFieldPrice] = useState('');

    const storeData = () => {
        const myData = {
            title: textField,
            price: parseFloat(textFieldPrice),
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

    return (
        <View>
            <View style={styles.container}>
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
            <ScrollView>
                <Container>
                    <Content>
                        <List>
                            {app.state.allItems.map(item => {
                                return (
                                    <ListItem key={item._id}>
                                        <Text>{item.title} </Text>
                                        <Text> {item.price.toString()} euros</Text>
                                        <Button
                                            style={styles.button}
                                            onPress={() => handleRemove(item)}>
                                            <Text>Remove</Text>
                                        </Button>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Content>
                </Container>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        paddingTop: 22,
        marginLeft: '5%',
    },
    button: {

    },
    input: {
        marginBottom: '5%',
        borderBottomColor: 'gray',
        borderWidth: 0.5,
        height: 45
    }
});

export default AddMoreItemsScreen;