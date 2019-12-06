import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity, Dimensions, TouchableHighlight, AsyncStorage} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudents, deleteStudent } from '../Redux/Actions/types';
import ListItem from './ListItem';

export default function Home(props) {
    const dispatch = useDispatch();
    const {navigation} = props;

    const [isFetching, setIsFetching] = useState(false);

    // Access Redux Store State
    const studentReducer = useSelector((state) => state.studentReducer);
    const { students } = studentReducer;

    useEffect(() => getData(), [])

    const getData = () => {
        setIsFetching(true);

        AsyncStorage.getItem('students', (err, students) => {
            if (err) {
                alert(err.message)
            }
            else if (students !== null) {
                dispatch(getStudents(JSON.parse(students)))
            }

            setIsFetching(false);
        })
    }

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('ViewStudent', {
                    id: item.id,
                    name: item.name,
                    age: item.age,
                    gender: item.gender,
                    grade: item.grade
                })}
            >
                <ListItem item={item} index={index} navigation={navigation} onDelete={onDelete} onEdit={onEdit} />
            </TouchableOpacity>
        )
    }

    const onEdit = (item) => {
        navigation.navigate('NewStudent', {student: item, title: 'Edit Student'})
        alert(JSON.stringify(item))
    }

    const onDelete = (id) => {
        AsyncStorage.getItem('students', (err, students) => {
            if (err) {
                alert(err.message)
            }
            else if (students !== null) {
                students = JSON.parse(students);

                // Find index of student passed
                const index = students.findIndex((obj) => obj.id === id)

                // Remove Student
                if (index !== -1) {
                    students.splice(index, 1)
                }

                // Update local storage
                AsyncStorage.setItem('students', JSON.stringify(students), () => dispatch(deleteStudent(id)));
            }
        })
    }

    if (isFetching) {
        return (
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator animating={true} />
            </View>
        )
    } else {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={students}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `students_${index}`}
                />

                <TouchableHighlight
                    style={styles.floatingButton}
                    underlayColor='#228B22'
                    onPress={() => navigation.navigate('NewStudent', {title: "New Student"})}
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