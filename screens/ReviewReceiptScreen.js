import React, { useEffect, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AppContext from '../AppContext';
import { Container, Header, Content, List, ListItem, Text, Button } from 'native-base';

const ReviewReceiptScreen = () => {
    const app = useContext(AppContext);

    return (
        <View>
            <Text>ReviewReceiptScreen</Text>
            <ScrollView>
                <Container>
                    <Content>
                        <List>
                        {app.state.selectedItems.map(item => {
                            return (
                                <ListItem key={item.id + Math.random()}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.hinta.toString()}</Text>
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

export default ReviewReceiptScreen;