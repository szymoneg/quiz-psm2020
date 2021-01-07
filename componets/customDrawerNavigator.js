import React from "react";
import {
    DrawerContentScrollView, DrawerItem,
    DrawerItemList,
} from '@react-navigation/drawer';
import {Text, View, Button} from "react-native";

const _ = require("lodash");

export default class CustomDrawerContent extends React.Component {
    state = {
        id: [],
        tests: [],
    }

    getQuizList = () => {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                let temp = []
                json.map(data => {
                    temp.push(data.id);
                })
                temp = _.shuffle(temp)
                this.setState({
                    ...this.state,
                    id: temp
                }, () => {
                    console.log(this.state.id[1].toString())
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };


    getManualyTest = () => {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    ...this.state,
                    tests: json,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getQuizList();
    }

    render() {
        return (
            <View>
                {console.log(this.state.id[1])}
                <Button title={"Home"} onPress={() => this.props.navigation.navigate("Home")}/>
                <Button title={"Stats"} onPress={() => this.props.navigation.navigate("Details")}/>
                <Button title={"Random"}
                        onPress={() => this.props.navigation.navigate("Test", {id: this.state.id[1]})}/>
                <Button title={"Download data"} onPress={() => this.getManualyTest()}/>
            </View>
        );
    }
}


