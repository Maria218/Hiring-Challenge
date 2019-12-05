import React, {useRef} from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, TouchableHighlight, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function ViewStudent (props){
    const {navigation} = props;
    let name = navigation.getParam('name', null)
    let age = navigation.getParam('age', null)
    let gender = navigation.getParam('gender', null)
    let grade = navigation.getParam('grade', null)

    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Content>
                    <Title style={{textDecorationLine: 'underline'}}>{name}</Title>
                    <View style={styles.cardStyle}>
                        <Paragraph style={{fontSize: 20}}><Text style={{fontWeight: 'bold'}}>Grade:</Text> {grade}</Paragraph>
                        <Paragraph style={{fontSize: 20}}><Text style={{fontWeight: 'bold'}}>Age:</Text>  {age}</Paragraph>
                    </View>
                    <View style={styles.cardStyle}>
                        <Paragraph style={{fontSize: 20}}><Text style={{fontWeight: 'bold'}}>Gender:</Text>  {gender}</Paragraph>
                    </View>
                </Card.Content>
            </Card>

            <TouchableHighlight
                style={styles.floatingButton}
                underlayColor='#228B22'
                onPress={() => navigation.navigate('NewResult', {title: "New Result"})}
            >
                <Text style={{fontSize: 25, color: 'white'}}>+</Text>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    cardStyle: {
        flexDirection: 'row',
        padding: 10,
        margin: 10,
        justifyContent:'space-between'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    floatingButton:{
        backgroundColor: '#228B22',
        borderColor: '#228B22',
        height: 55,
        width: 55,
        borderRadius: 55 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 60,
        right: 15,
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});