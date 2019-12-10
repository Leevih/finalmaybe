import React, { useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

const AllReceiptsScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    const handleReceiptSelection = (item) => {
        app.dispatch({ type: 'SET_SELECTED_RECEIPT', payload: item });
        navigation.navigate('SingleReceipt');
        //console.log(app.state.SingleReceipt)
    }

    return (
        <View>
            <ScrollView>
                <Container>
                    <Content>
                        <List>
                            {app.state.allReceipts.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => handleReceiptSelection(item)} key={item._id + Math.random()}>
                                    <ListItem >
                                        <Text>{moment(item.date).format('DD/MM/YYYY HH:mm')} </Text>
                                        <Text> {item.total.toString()} euros</Text>
                                    </ListItem>
                                 </TouchableOpacity>
                        )
                    })}
                        </List>
                    </Content>
                </Container>
            </ScrollView>
        <View style={styles.tabBarInfoContainer} hide>

        </View>
        </View >
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

export default AllReceiptsScreen;