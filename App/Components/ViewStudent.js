import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function ViewStudent (props){
    const {navigation} = props;

    return (
        <View>
            <View>
                <Text>
                    Name:
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor:"#ccc",
        backgroundColor: '#FFF',
        padding: 10
    },

    container:{
        padding: 10
    },

    author: {
        marginTop: 25,
        marginBottom: 10,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 15,
        color: '#FFF',
        textAlign: "right"
    },

    quote: {
        marginTop: 5,
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        lineHeight: 21,
        color: '#FFF',
    },

    buttons:{
        width: 190,
        flexDirection: 'row'
    },

    rightAction: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: 95,
    },

    editAction: {
        backgroundColor: '#497AFC'
    },

    deleteAction: {
        backgroundColor: '#dd2c00'
    },

    actionText: {
        color: '#fff',
        fontWeight: '600',
        padding: 20,
    }
});
