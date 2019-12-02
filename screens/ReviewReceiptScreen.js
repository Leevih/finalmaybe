import React, { useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

import receiptService from '../services/receipt-service';


const ReviewReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    const handleSubmit = () => {
        const reduceThePrice = (array) => {
            const prices = array.map(item => item.price)
            const price = prices.reduce((x, y) => { return x + y}, 0)
            return price;
        }

        const data = {
            products: app.state.selectedItems,
            total: reduceThePrice(app.state.selectedItems),
        };

        receiptService
        .postItem(data)
        .then(res => {
            console.log(res.data);
        })
        navigation.navigate('Home')
    };

    return (
        <View>
            <Text>ReviewReceiptScreen</Text>
            <ScrollView>
                <Container>
                    <Content>
                        <List>
                        {app.state.selectedItems.map(item => {
                            return (
                                <ListItem key={item._id + Math.random()}>
                                    <Text>{item.title} </Text>
                                    <Text> {item.price.toString()} euros</Text>
                                    <Button onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item})}><Text>Remove</Text></Button>
                                </ListItem>
                            )
                        })}
                        </List>
                    </Content>
                </Container>
            </ScrollView>
            <View style={styles.tabBarInfoContainer} hide>
                <Button
                    onPress={() => handleSubmit()}
                >
                    <Text>Send</Text>
                </Button>
            </View>
        </View>
    )
}


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

export default ReviewReceiptScreen;