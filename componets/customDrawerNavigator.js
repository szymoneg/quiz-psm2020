import React from "react";
import {Image, View, Button, StyleSheet} from "react-native";
import {getData, saveData} from "../async/AsyncStorage";

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
            }).then(quiz => saveData("db", JSON.stringify(quiz)))
            .catch((error) => {
                console.error(error);
            });

        getData("db")
            .then(data => JSON.parse(data))
            .then(quiz => {
                this.setState({
                    ...this.state,
                    tests: _.shuffle(quiz)
                })
            })
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
                <Image source={require('../assets/iconQuiz.png')} style={styles.image}/>
                <Button title={"Home"} onPress={() => this.props.navigation.navigate("Home")}/>
                <Button title={"Stats"} onPress={() => this.props.navigation.navigate("Details")}/>
                <Button title={"Random"}
                        onPress={() => this.props.navigation.navigate("Test", {id: this.state.id[1]})}/>
                <Button title={"Download data"} onPress={() => this.getManualyTest()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    image:{
        width:120,
        height: 120,
        alignSelf: 'center',
        marginVertical: 10
    }
})


