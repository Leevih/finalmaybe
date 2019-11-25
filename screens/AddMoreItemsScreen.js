import { View, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AppContext from '../AppContext'
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';


const AddMoreItemsScreen = () => {
    const app = useContext(AppContext);
    const [ hasData, setHasData ] = useState(false);
    const [textField, setTextField] = useState('');
    const [ textFieldPrice, setTextFieldPrice ] = useState('');

    const storeData = () => {
        const myData = {
            key: textField,
            price: parseFloat(textFieldPrice),
            id: Math.floor(Math.random()* 999 * app.state.allItems.length),
        }
        app.dispatch({ type: 'ADD_NEW_ITEM', payload: myData })
        setTextField('');
        setTextFieldPrice(0);
        setHasData(true)
        //console.log(app.state.newItems)
    }

    const handleRemove = (item) => {
        app.dispatch({ type: 'REMOVE_THIS_FROM_ALL', payload: item})
    }

    return (
        <View>
            <View>
                <Text>AddMoreItemsScreen</Text>
                <TextInput
                    onChangeText={event => setTextField(event)}
                    value={textField}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                />
                <TextInput
                    onChangeText={event => setTextFieldPrice(event)}
                    value={textFieldPrice.toString()}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    keyboardType={'numeric'}
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
                                <ListItem key={item.id}>
                                    <Text>{item.key} </Text>
                                    <Text> {item.price.toString()} euros</Text>
                                    <Button onPress={() => handleRemove(item)}><Text>Remove</Text></Button>
                                </ListItem>
                            )
                        })}
                        </List>
                    </Content>
                </Container>
            </ScrollView>
        </View>
    )
}

export default AddMoreItemsScreen;