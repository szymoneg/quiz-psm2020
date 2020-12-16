import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer';
import ResultScreen from "./screens/resultScreen";
import HomeScreen from "./screens/homeScreen";
import TestScreen from "./screens/testScreen";
import {Modal,Text, View, TouchableOpacity,StyleSheet,StatusBar,ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';
import flattenArray from "react-native-web/dist/modules/flattenArray";

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
        modalVisible: true,
        assetsLoaded: false,
        isLoading: false,
        tests:[]

    }

    componentDidMount() {
        retrieveData()
            .then(data => data !== 'XD')
            .then(data => this.setState({modalVisible: data}));

        Font.loadAsync({
            'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
            'idnidXDD': require('./assets/fonts/AndikaNewBasic-Bold.ttf'),
            'XDDD': require('./assets/fonts/Langar-Regular.ttf')
        }).then(r => {
            this.setState({
                ...this.state,
                assetsLoaded: true
            })
        });
    }

    handleAccept = () =>{
        storeData('XD').then(() => this.setState({modalVisible: false}));
    }

    render() {
        const {assetsLoaded} = this.state;
        if (assetsLoaded) {
            return (
                <NavigationContainer>
                    <Modal visible={this.state.modalVisible}>
                        <View>
                            <Text style={styles.finishText}>
                                Regulamin!
                            </Text>
                            <TouchableOpacity onPress={this.handleAccept}>
                                <Text style={styles.finishText}>Zgadzam sie!</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home" component={HomeScreen}/>
                        <Drawer.Screen name="Details" component={ResultScreen} options={{unmountOnBlur: true}}/>
                        <Drawer.Screen name="Test" component={TestScreen} options={{unmountOnBlur: true}}/>
                    </Drawer.Navigator>
                </NavigationContainer>
            );
        }else {
            return (
                <View>
                    <ActivityIndicator />
                    <StatusBar barStyle="default" />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    finishText: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
});
