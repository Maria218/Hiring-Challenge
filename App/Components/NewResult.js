import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableHighlight, View, AsyncStorage } from 'react-native';
import { DefaultTheme, TextInput } from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {Header} from 'react-navigation-stack';
import { addResult, updateResult } from '../Redux/Actions/types';

export default function NewResult(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let result = navigation.getParam('result', null);
    let id = navigation.getParam('id', null);

    const [isSaving, setIsSaving] = useState(false)
    const [subject, setSubject] = useState(result ? result.subject : "")
    const [mark, setMark] = useState(result ? result.mark : "")

    const onSave = () => {
        let edit = result !== null;
        let result_ = {};

        if (edit) {
            result_ = result;
            result_['subject'] = subject;
            result_['mark'] = mark;
        } else {
            // let id = new Date().getTime();
            result_ = {
                "id": id,
                "subject": subject,
                "mark": mark,
            };
        }

        AsyncStorage.getItem('results', (err, results) => {
            if (err) {
                alert(err.message)
            }
            else if (results !== null) {
                results = JSON.parse(results);

                if (!edit) {
                    // Add new results to the top
                    results.unshift(result_);
                } else {
                    // Find index of the passed result
                    const index = results.findIndex((obj) => obj.id === result_.id);

                    // If the result exists, replace it
                    if (index !== -1) {
                        results[index] = result_;
                    }
                }

                AsyncStorage.setItem('results', JSON.stringify(results), () => {
                    if (!edit) {
                        dispatch(addResult(result_));
                    } else {
                        dispatch(updateResult(result_));
                    }

                    navigation.goBack()
                })
            }
        })
    }

    const theme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#228B22',
        },
    };

    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} style={styles.flex} behavior="padding">
            <SafeAreaView style={styles.flex}>
                <View>
                    <TextInput
                        onChangeText={(text) => setSubject(text)}
                        label="Enter A Subject"
                        underlineColor="#228B22"
                        selectionColor="#228B22"
                        theme={theme}
                        style={[styles.text]}
                        value={subject}
                    />
                    <TextInput
                        onChangeText={(text) => setMark(text)}
                        label="Enter Result"
                        underlineColor="#228B22"
                        selectionColor="#228B22"
                        theme={theme}
                        style={[styles.text]}
                        value={mark}
                        keyboardType="number-pad"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <TouchableHighlight
                            style={[styles.button]}
                            onPress={onSave}
                            underlayColor="rgba(0, 0, 0, 0)"
                        >
                            <Text style={[styles.buttonText, {color: "#FFF"}]}>
                                Save
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },

    buttonContainer: {
        height: 70,
        flexDirection: "row",
        padding: 12,
        backgroundColor: "white"
    },

    count: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 17,
        color: "#6B9EFA"
    },

    button: {
        width: 80,
        height: 44,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: "#20B2AA"
    },

    buttonText: {
        fontFamily: 'HelveticaNeue-Medium',
        fontSize: 16,
    },
    text: {
        backgroundColor: "#fff",
        fontSize: 30,
        lineHeight: 13,
        fontFamily: 'Helvetica Neue',
        color: "#333333",
        padding: 16,
        paddingTop: 16,
        minHeight: 80,
        borderTopWidth: 1,
        borderColor: "rgba(212,211,211, 0.3)"
    }
});
