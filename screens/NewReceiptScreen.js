import React, { useEffect, useContext, useState } from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

//import TabBarForNewReceipt from '../components/TabBarForNewReceipt';

const NewReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);
    const [ tabBarVisible, setTabBarVisible ] = useState(true)

    const renderList = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Text style={styles.itemName}>{item.key}</Text>
                <Text style={styles.itemPrice}>{item.price.toString()} e</Text>
                <Button
                    onPress={() => app.dispatch({ type: 'ADD_THIS', payload: item })}>
                    <Text>Add</Text>
                </Button>
                <Button
                    onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item })}>
                    <Text>Remove</Text>
                </Button>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button onPress={() => setTabBarVisible(!tabBarVisible)}>
                <Text>change TabBar state</Text>
            </Button>
             <FlatList
                data={app.state.allItems}
                renderItem={(item) => renderList(item)}
            />
{/*             <ScrollView>
                <Container>
                    <Content>
                        <List>
                        {app.state.allItems.map(item => {
                            return (
                                <ListItem key={item.id + Math.random()}>
                                    <Text>{item.key} </Text>
                                    <Text> {item.price.toString()} euros</Text>
                                    <Button onPress={() => app.dispatch({ type: 'ADD_THIS', payload: item})}><Text>Add</Text></Button>
                                    <Button onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item})}><Text>Remove</Text></Button>
                                </ListItem>
                            )
                        })}
                        </List>
                    </Content>
                </Container>
            </ScrollView> */}
            {tabBarVisible ? 
            <View style={styles.tabBarInfoContainer} hide>
                <Button
                    onPress={() => console.log(app.state.allItems)}
                >
                    <Text>Show</Text>
                </Button>
                <Button
                    onPress={() => navigation.navigate('ReviewReceipt')}
                >
                    <Text>Next</Text>
                </Button>
            </View> 
            :
             null}

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