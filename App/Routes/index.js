import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../Components/LoadingScreen';
import HomeScreen from '../Components/Home';
import NewStudentScreen from '../Components/NewStudent';
import NewResultScreen from '../Components/NewResult';
import ViewStudentScreen from '../Components/ViewStudent';

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `StudentTracker`
        })
    },
    NewStudent: {
        screen: NewStudentScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Create Student`
        })
    },
    NewResult: {
        screen: NewResultScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Add Student Results`
        })
    },
    ViewStudent: {
        screen: ViewStudentScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Student Overview`
        })
    }
})

const RoutesStack = createSwitchNavigator(
    {
        Loading: LoadingScreen,
        App: AppStack
    },
    {initialRouteName: 'Loading'}
)

const Router = createAppContainer(RoutesStack)

export default Router;
