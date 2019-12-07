import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

let colors = ['#228B22', '#20B2AA'];

export default function ListItem ({item, index, navigation, onDelete, onEdit}){

    function random() {
        if (index % 2 === 0) {
            return colors[0]
        }
        else {
            return colors[1]
        }
    }

    return (
            <View style={styles.row}>
                <View style={[styles.container, {backgroundColor: random()}]}>
                    <Text style={styles.quote}>
                        {item.name}
                    </Text>
                    <Text style={styles.author}>
                        Grade {item.grade}
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