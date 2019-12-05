import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../Components/LoadingScreen';
import HomeScreen from '../Components/Home';
import NewStudentScreen from '../Components/NewStudent';
import ViewStudentScreen from '../Components/ViewStudent';

const AppStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Home`
        })
    },
    NewStudent: {
        screen: NewStudentScreen,
        navigationOptions: ({ navigation }) => ({
            title: `Create or Edit Student`
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
