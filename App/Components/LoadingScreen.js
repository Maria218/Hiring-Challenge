import React, { useEffect } from "react";
import { AsyncStorage, View, ActivityIndicator, StyleSheet } from "react-native";
import students from './students';
import results from './results';

export default function LoadingScreen(props) {
    // let items = []

    useEffect(() => checkLocalData(), checkLocalData2(), []);

    function checkLocalData() {
        // Check if data exists
        AsyncStorage.getItem('results', (err, data) => {
            // If not, get data from JSON file
            if (data === null) {
                AsyncStorage.setItem('results', JSON.stringify(results.results)) //save data in AsyncStorage
                props.navigation.navigate('App') // Navigate to Home Page
            }
            else {
                props.navigation.navigate('App') // Navigate to Home Page
            }
        })
    }

    function checkLocalData2() {
        // Check if data exists
        AsyncStorage.getItem('students', (err, data) => {
            // If not, get data from JSON file
            if (data === null) {
                AsyncStorage.setItem('students', JSON.stringify(students.students)) //save data in AsyncStorage
                props.navigation.navigate('App') // Navigate to Home Page
            }
            else {
                props.navigation.navigate('App') // Navigate to Home Page
            }
        })
    }

    return (
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator animating={true} />
        </View>
    )
}

const styles = StyleSheet.create({
    activityIndicatorContainer: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});