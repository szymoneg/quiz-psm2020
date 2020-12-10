import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal} from 'react-native';
import Navbar from "../componets/navbar";

const task = [
    {
        "question": "o której godzinie umarł Jan Paweł 2?",
        "answers": [
            {
                "content": "21:38",
                "isCorrect": false
            },
            {
                "content": "21:37",
                "isCorrect": true
            },
            {
                "content": "12:38",
                "isCorrect": false
            },
            {
                "content": "4:20",
                "isCorrect": false
            },
        ],
        "duration": 30
    },
    {
        "question": "o której godzinie umarł Jan Paweł 2?",
        "answers": [
            {
                "content": "21:38",
                "isCorrect": false
            },
            {
                "content": "21:37",
                "isCorrect": true
            },
            {
                "content": "12:38",
                "isCorrect": false
            },
            {
                "content": "4:20",
                "isCorrect": false
            },
        ],
        "duration": 30
    },
]


class TestScreen extends React.Component {
    state = {
        test: {answers: []},
        testIndex: -1,
        points: 0,
        duration: 30,
        loaded: false,
        completed: false,
        testNumber: this.props.route.params.testNumber,
    }

    componentDidMount() {
        this.loadTest();
    }

    loadTest = () => {

        let { testIndex } = this.state;

        testIndex = testIndex + 1;

        if (task.length === testIndex){
            this.setState({
                ...this.state,
                completed: true,
                loaded: false
            })
        }else {
            this.setState({
                ...this.state,
                test: task[testIndex],
                duration: task[testIndex].duration,
                loaded: false
            })
        }
    }

    handleNextTask = () => {
        let { testIndex } = this.state;
        testIndex = testIndex + 1;
        this.setState({
            ...this.state,
            testIndex
        }, () => {
            this.loadTest();
        })
    }

    markAnswer = (id) => {
        const { answers } = this.state.test;
        let { points } = this.state;

        if (answers[id].isCorrect === true ){
            points +=1;
        }

        this.setState({
            ...this.state,
            points,
            loaded: false,
        }, ()=> this.handleNextTask())
    }

    //TODO do dokonczenia!
    render() {
        const {title, testNumber} = this.props.route.params;
        // const {test,currQuestion,currScore,duration} = this.state;
        return (
            <View style={{flex: 1}}>
                <Navbar navigation={this.props.navigation} title={title}/>
                <View style={styles.first}>
                    <Text style={styles.firstText}>Question {this.state.testIndex+2} of {task.length}</Text>
                    <Text style={styles.firstText}>Time: {this.state.duration}</Text>
                </View>
                <View style={styles.second}>
                    <Text style={styles.firstText}>{this.state.test.question}</Text>
                </View>
                <View style={styles.bottomAnswer}>
                    {console.log(this.state)}
                    {this.state.test.answers.map((val,index) => {
                        return (<TouchableOpacity onPress={() => this.markAnswer(index)} style={styles.answer}>
                            <Text style={styles.answerText}>{val.content}</Text>
                        </TouchableOpacity>)
                    })
                    }
                </View>
                {this.state.completed &&
                <View>
                    <Text>Gratulacje!{this.state.points}</Text>
                </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    first: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    firstText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center'
    },
    secondText: {
        fontSize: 12,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    bottomAnswer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        marginHorizontal: 10,
        borderWidth: 1,
    },
    answer: {
        width: "30%",
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: 'lightgrey'
    },
    answerText: {
        fontSize: 16,
        textAlign: 'center',
    }
});


export default TestScreen;
