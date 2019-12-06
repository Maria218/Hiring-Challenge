import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, SafeAreaView, AsyncStorage, FlatList } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator, Button, DefaultTheme } from 'react-native-paper';
import { getResults, deleteResult } from '../Redux/Actions/types';
import { useDispatch, useSelector } from 'react-redux';

export default function ViewStudent(props) {
    const inputEl = useRef(null);
    const dispatch = useDispatch();
    const {navigation} = props;

    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const resultReducer = useSelector((state) => state.resultReducer);
    const { results } = resultReducer;

    let id = navigation.getParam('name', null)
    let name = navigation.getParam('name', null)
    let age = navigation.getParam('age', null)
    let gender = navigation.getParam('gender', null)
    let grade = navigation.getParam('grade', null)

    useEffect(() => getData(), [])

    const getData = () => {
        setIsFetching(true);

        AsyncStorage.getItem('results', (err, results) => {
            if (err) {
                alert(err.message)
            }
            else if (results !== null) {
                dispatch(getResults(JSON.parse(results)))
            }
            else if (results === null) {
                alert("THIS STUDENT HAS NO RESULTS TO SHOW YET")
            }

            setIsFetching(false)
        })
    }

    const renderItem = ({item, index}) => {
        return (
            <Card>
                <Card.Content>
                    <Title style={{textDecorationLine: 'underline'}}>{item.subject}</Title>
                    <View style={{justifyContent: 'center'}}>
                        <Paragraph style={{fontSize: 20}}>{item.mark}</Paragraph>
                        <Paragraph style={{fontSize: 20}}>{item.id}</Paragraph>
                    </View>
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => {
                        onEdit(item)
                    }}>Edit Result</Button>
                    <Button onPress={() => {
                        onDelete(item.id)
                    }}>Delete Result</Button>
                </Card.Actions>
            </Card>
        )
    }

    const onEdit = (item) => {
        navigation.navigate('NewResult', {result: item})
    }

    const onDelete = (id) => {
        AsyncStorage.getItem('results', (err, results) => {
            if (err) {
                alert(err.message)
            }
            else if (results !== null) {
                results = JSON.parse(results)

                // Find index of result passed
                const index = results.findIndex((obj) => obj.id === id)

                // Remove Result
                if (index !== -1) {
                    results.splice(index, 1)
                }

                // Update local storage
                AsyncStorage.setItem('results', JSON.stringify(results), () => dispatch(deleteResult(id)));
            }
        })
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#000',
        },
    };

    if (isFetching) {
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
                    <Card.Actions style={{justifyContent: 'space-between'}}>
                        <Button>Edit Student</Button>
                        <Button>Delete Student</Button>
                    </Card.Actions>
                </Card>

                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} />
                </View>
    
                <TouchableHighlight
                    style={styles.floatingButton}
                    underlayColor='#228B22'
                    onPress={() => navigation.navigate('NewResult', {id: id})}
                >
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        )
    } else {
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
                    <Card.Actions style={{justifyContent: 'space-between'}}>
                        <Button>Edit Student</Button>
                        <Button>Delete Student</Button>
                    </Card.Actions>
                </Card>
                <FlatList
                    data={results}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `results_${index}`}
                />
    
                <TouchableHighlight
                    style={styles.floatingButton}
                    underlayColor='#228B22'
                    onPress={() => navigation.navigate('NewResult', {id: id})}
                >
                    <Text style={{fontSize: 25, color: 'white'}}>+</Text>
                </TouchableHighlight>
            </SafeAreaView>
        )
    }
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