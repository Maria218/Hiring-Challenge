import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.textInput}
                    multiline={true}
                    placeholder="What do you want to do today?"
                    placeholderTextColor="#abbabb"
                />
                <TouchableOpacity>
                    <Icon name='plus' size={30} color="blue" style={{ margin: 15 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        marginTop: '15%',
        fontSize: 20,
        color: 'red',
        paddingBottom: 10
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        borderColor: 'black',
        borderBottomWidth: 1,
        paddingRight: 10,
        paddingBottom: 10
    },
    textInput: {
        flex: 1,
        height: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingLeft: 10,
        minHeight: '3%'
    }
});
