import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer';
import ResultScreen from "./screens/resultScreen";
import HomeScreen from "./screens/homeScreen";
import TestScreen from "./screens/testScreen";

const Drawer = createDrawerNavigator();

export default class App extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Details" component={ResultScreen}/>
                    <Drawer.Screen name="Test" component={TestScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
