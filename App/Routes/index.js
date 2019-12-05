import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from '../Components/LoadingScreen';
import HomeScreen from '../Components/Home';
import NewStudentScreen from '../Components/NewStudent';

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
            title: `Add Student`
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
