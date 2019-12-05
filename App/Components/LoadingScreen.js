import React, { useEffect } from "react";
import { AsyncStorage, View, ActivityIndicator, StyleSheet } from "react-native";
import students from './students';

export default function LoadingScreen(props) {
    useEffect(() => checkLocalData(), []);

    function checkLocalData() {
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