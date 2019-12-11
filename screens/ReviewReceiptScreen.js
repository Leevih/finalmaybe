import React, { useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

import receiptService from '../services/receipt-service';
import { FlatList } from 'react-native-gesture-handler';


const ReviewReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    const handleSubmit = () => {
        const reduceThePrice = (array) => {
            const prices = array.map(item => item.price)
            const price = prices.reduce((x, y) => { return x + y }, 0)
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
                app.dispatch({ type: 'ADD_RECEIPT', payload: res.data });
            })
        navigation.navigate('Home')
    };

    
    const renderList = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemPrice}>{item.price.toString()} e</Text>
                <Button style={styles.listButton}
                    onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item })}>
                    <Text>Remove</Text>
                </Button>
            </View>
        )
    }

    return (
        <View>
            <View>
                <Button style={styles.send}
                    onPress={() => handleSubmit()}
                >
                    <Text>Send</Text>
                </Button>
            </View>
            <FlatList
                style={styles.list}
                data={app.state.selectedItems}
                renderItem={(item) => renderList(item)}
                keyExtractor={item => item._id + Math.random()}
            />{/* 
            <ScrollView>
                <Container>
                    <Content>
                        <List>
                            {app.state.selectedItems.map(item => {
                                return (
                                    <ListItem key={item._id + Math.random()}>
                                        <Text>{item.title} </Text>
                                        <Text> {item.price.toString()} euros</Text>
                                        <Button onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item })}><Text>Remove</Text></Button>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Content>
                </Container>
            </ScrollView> */}
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
    send: {
        alignContent: 'center'
    },
    list: {
        marginTop: '2%',
        marginBottom: '18%'
    },

});

export default ReviewReceiptScreen;