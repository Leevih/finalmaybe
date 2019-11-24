import React, { useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

const NewReceiptScreen = ({ navigation }) => {
    const app = useContext(AppContext);

    useEffect(() => {
        console.log(app.state.allItems)
    }, [])

    return (
        <View>
            <ScrollView>
                <Text>NewReceiptScreen</Text>
                <Container>
                    <List>
                        {app.state.allItems.map(item => {
                            return (
                                <ListItem key={item.id}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.hinta.toString()}</Text>
                                    <Button onPress={() => app.dispatch({ type: 'ADD_THIS', payload: item })}><Text>+</Text></Button>
                                    <Button onPress={() => app.dispatch({ type: 'REMOVE_THIS', payload: item })}><Text>-</Text></Button>
                                </ListItem>
                            )
                        })}
                    </List>
                </Container>
            </ScrollView>
            <View style={styles.tabBarInfoContainer}>
                <Button
                    onPress={() => console.log(app.state.selectedItems)}
                >
                <Text>Show</Text>
                </Button>
                {/* <Text>Total is {app.state.selectedItems.length > 0 ? app.state.selectedTotal.toFixed(2) : 0} euros</Text> */}
                <Button
                    onPress={() => navigation.navigate('ReviewReceipt')}
                >
                <Text>Next</Text>
                </Button>
            </View>
        </View>
    )
}

export default NewReceiptScreen;


const styles = StyleSheet.create({
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },

});  