import React, { useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import AppContext from '../AppContext';

const TabBarForNewReceipt = ({ navigation }) => {
    const app = useContext(AppContext);

    return(
    <View style={styles.tabBarInfoContainer}>
        <Button
            onPress={() => console.log(app.state.selectedItems)}
        >
            <Text>Show</Text>
        </Button>
        <Button
            onPress={() => navigation.navigate('ReviewReceipt')}
        >
            <Text>Next</Text>
        </Button>
    </View>
    )
}

export default TabBarForNewReceipt


const styles = StyleSheet.create({
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        //alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
});  