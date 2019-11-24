import { View, TextInput } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import AppContext from '../AppContext'
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';


const AddMoreItemsScreen = () => {
    const app = useContext(AppContext);
    const [ hasData, setHasData ] = useState(false);
    const [textField, setTextField] = useState('');
    const [ textFieldPrice, setTextFieldPrice ] = useState(0);

    const storeData = () => {
        const myData = {
            name: textField,
            price: textFieldPrice,
        }
        app.dispatch({ type: 'ADD_NEW_ITEM', payload: myData })
        setTextField('');
        setTextFieldPrice(0);
        setHasData(true)
        console.log(app.state.newItems)
    }

    const renderData = () => {
        console.log(app.state.newItems)
        return app.state.newItems.map(item => {
            <ListItem key={Math.random()}>
                <Text>{item.name}</Text>
            </ListItem>
        })
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
                <List>
                    { hasData ? renderData() : null }
                </List>
            </ScrollView>

        </View>
    )
}

export default AddMoreItemsScreen;