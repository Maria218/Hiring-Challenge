import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableHighlight, View, AsyncStorage } from 'react-native';
import {useDispatch} from 'react-redux';
import {Header} from 'react-navigation-stack';
import { addStudent, updateStudent } from '../Redux/Actions/types';

export default function NewStudent(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    let student = navigation.getParam('student', null);

    const [isSaving, setIsSaving] = useState(false)
    const [name, setName] = useState(student ? student.name : "")
    const [grade, setGrade] = useState(student ? student.grade : "")
    const [gender, setGender] = useState(student ? student.gender : "")
    const [age, setAge] = useState(student ? student.age : "")

    const onSave = () => {
        let edit = student !== null;
        let student_ = {};

        if (edit) {
            student_ = student;
            student_['name'] = name;
            student_['grade'] = grade;
            student_['gender'] = gender;
            student_['age'] = age;
        } else {
            let id = new Date().getTime();
            student_ = {
                "id": id,
                "name": name,
                "grade": grade,
                "gender": gender,
                "age": age
            };
        }

        AsyncStorage.getItem('students', (err, students) => {
            if (err) {
                alert(err.message)
            }
            else if (students !== null) {
                students = JSON.parse(students);

                if (!edit) {
                    // Add new students to the top
                    students.unshift(student_);
                } else {
                    // Find index of the passed student
                    const index = students.findIndex((obj) => obj.id === student_.id);

                    // If the student exists, replace it
                    if (index !== -1) {
                        students[index] = student_;
                    }
                }

                AsyncStorage.setItem('students', JSON.stringify(students), () => {
                    if (!edit) {
                        dispatch(addStudent(student_));
                    } else {
                        dispatch(updateStudent(student_));
                    }

                    navigation.goBack()
                })
            }
        })
    }

    let disabled = (name.length > 0 && grade.length > 0 && gender.length > 0 && age.length > 0) ? false : true;
    return (
        <KeyboardAvoidingView keyboardVerticalOffset={Header.HEIGHT} style={styles.flex} behavior="padding">
            <SafeAreaView style={styles.flex}>
                <View>
                    <TextInput
                        onChangeText={(text) => setName(text)}
                        placeholder={"Student Name"}
                        style={[styles.text]}
                        value={name}
                    />
                    <TextInput
                        onChangeText={(text) => setAge(text)}
                        placeholder={"Enter Age"}
                        style={[styles.text]}
                        value={age}
                    />
                    <TextInput
                        onChangeText={(text) => setGrade(text)}
                        placeholder={"Student Grade"}
                        style={[styles.text]}
                        value={grade}
                    />
                    <TextInput
                        onChangeText={(text) => setGender(text)}
                        placeholder={"Student Gender"}
                        style={[styles.text]}
                        value={gender}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <View style={{flex: 1, alignItems: "flex-end"}}>
                        <TouchableHighlight
                            style={[styles.button]}
                            disabled={disabled}
                            onPress={onSave}
                            underlayColor="rgba(0, 0, 0, 0)"
                        >
                            <Text style={[styles.buttonText, {color: disabled ? "rgba(255,255,255,.5)" : "#FFF"}]}>
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
