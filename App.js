import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer';
import ResultScreen from "./screens/resultScreen";
import HomeScreen from "./screens/homeScreen";
import TestScreen from "./screens/testScreen";
import {Modal,Text, View, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

const storeData = async () => {
    try {
        await AsyncStorage.setItem('@MySuperStore:key','I like to save it.');
    }catch (error){

    }
}

const retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        if (value !== null){
            return value;
        }
    }catch (e){
        return false;
    }
}

export default class App extends React.Component {
    state = {
        modalVisible: true
    }

    componentDidMount() {
        retrieveData()
            .then(data => data !== 'XD')
            .then(data => this.setState({modalVisible: data}));
    }

    handleAccept = () =>{
        storeData('XD').then(() => this.setState({modalVisible: false}));
    }

    render() {
        return (
            <NavigationContainer>
                <Modal visible={this.state.modalVisible}>
                    <View>
                        <Text>
                            Regulamin!
                        </Text>
                        <TouchableOpacity onPress={this.handleAccept}>
                            <Text>Zgadzam sie!</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={HomeScreen}/>
                    <Drawer.Screen name="Details" component={ResultScreen}/>
                    <Drawer.Screen name="Test" component={TestScreen}/>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}
