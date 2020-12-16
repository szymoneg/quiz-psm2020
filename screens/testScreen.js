import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
    Animated,
    TextInput
} from 'react-native';
import Navbar from "../componets/navbar";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";

let task = [
    {
        "question": "Rekin w języku angielski?",
        "answers": [
            {
                "content": "loading",
                "isCorrect": false
            },
            {
                "content": "shark",
                "isCorrect": true
            },
            {
                "content": "lion",
                "isCorrect": false
            },
            {
                "content": "cat",
                "isCorrect": false
            },
        ],
        "duration": 30
    },
    // {
    //     "question": "Jednym ze źródeł tłuszczów nasyconyc jest?",
    //     "answers": [
    //         {
    //             "content": "kawa",
    //             "isCorrect": false
    //         },
    //         {
    //             "content": "oliwa z oliwek",
    //             "isCorrect": true
    //         },
    //         {
    //             "content": "śmietana",
    //             "isCorrect": false
    //         },
    //         {
    //             "content": "woda",
    //             "isCorrect": false
    //         },
    //     ],
    //     "duration": 30
    // },
    // {
    //     "question": "Brno to miasto w?",
    //     "answers": [
    //         {
    //             "content": "Szwajcarii",
    //             "isCorrect": false
    //         },
    //         {
    //             "content": "Niemczech",
    //             "isCorrect": false
    //         },
    //         {
    //             "content": "Czechach",
    //             "isCorrect": true
    //         },
    //         {
    //             "content": "Polsce",
    //             "isCorrect": false
    //         },
    //     ],
    //     "duration": 5
    // },
]


class TestScreen extends React.Component {
    state = {
        tags: this.props.route.params.tags,
        nick: '',
        test: {answers: []},
        testIndex: -1,
        points: 0,
        duration: 30,
        loaded: false,
        completed: false,
        testNumber: this.props.route.params.testNumber,
        modalVisible: true,
        setModalVisible: false
    }

    componentDidMount() {
        this.getSpecificTest();
        this.loadTest();
    }

    handleChange = (nick) => {
        this.setState({
            ...this.state,
            nick
        })
    }

    getSpecificTest = () => {
        const {id} = this.props.route.params;
        fetch(`http://tgryl.pl/quiz/test/${id}`)
            .then((response) => response.json())
            .then((json) => {
                task = json.tasks;
                this.setState({
                    ...this.state,
                    isLoading: false
                });
            })
            .then(() => this.loadTest())
            .catch((error) => {
                console.error(error);
            });
    }

    postResult = () => {
        const {nick, points, tags} = this.state;
        fetch('http://tgryl.pl/quiz/result', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nick: nick,
                score: points,
                total: task.length,
                type: tags.join(',')
            })
        });
    }


    loadTest = () => {

        let {testIndex} = this.state;

        testIndex = testIndex + 1;

        if (task.length === testIndex) {
            this.setState({
                ...this.state,
                completed: true,
                loaded: false
            })
        } else {
            this.setState({
                ...this.state,
                test: task[testIndex],
                duration: task[testIndex].duration,
                loaded: true
            })
        }
    }

    handleNextTask = () => {
        let {testIndex} = this.state;
        testIndex = testIndex + 1;
        this.setState({
            ...this.state,
            testIndex
        }, () => {
            this.loadTest();
        })
    }

    markAnswer = (id) => {
        const {answers} = this.state.test;
        let {points} = this.state;

        if (answers[id].isCorrect === true) {
            points += 1;
        }

        this.setState({
            ...this.state,
            points,
            loaded: false,
        }, () => this.handleNextTask())
    }

    //TODO do dokonczenia!
    render() {
        const {title, testNumber} = this.props.route.params;
        let {navigation} = this.props;
        return (
            <View style={{flex: 1}}>
                <Navbar navigation={this.props.navigation} title={title}/>
                <View style={styles.first}>
                    <Text style={styles.firstText}>Question {this.state.testIndex + 2} of {task.length}</Text>
                    <Text style={styles.firstText}>Time: {this.state.duration}</Text>
                </View>
                <View style={styles.timer}>
                    {this.state.loaded &&
                    <CountdownCircleTimer key={this.state.testIndex} onComplete={this.handleNextTask} isPlaying
                                          duration={this.state.duration}
                                          colors={[['#004777', 0.4], ['#F7B801', 0.4], ['#A30000', 0.2],]}>
                        {({remainingTime, animatedColor}) => (
                            <Animated.Text style={{color: animatedColor}}>
                                {remainingTime}
                            </Animated.Text>
                        )}
                    </CountdownCircleTimer>}
                </View>
                <View style={styles.second}>
                    <Text style={styles.firstText}>{this.state.test.question}</Text>
                </View>
                <View style={styles.bottomAnswer}>
                    {this.state.test.answers.map((val, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => this.markAnswer(index)} style={styles.answer}>
                                <Text style={styles.answerText}>{val.content}</Text>
                            </TouchableOpacity>)
                    })
                    }
                </View>
                {this.state.completed &&
                <View>
                    <Modal visible={this.state.modalVisible}>
                        <Text style={styles.finishText}>Gratulacje!</Text>
                        <Text style={styles.finishText}>Uzyskałeś {this.state.points} punkt/ów</Text>
                        <View style={styles.textUsername}>
                            <TextInput onChangeText={(value) => this.handleChange(value)} value={this.state.nick}
                                       placeholder={'username'}/>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.postResult()
                            navigation.navigate("Home")
                        }}
                                          style={styles.usernameButton}>
                            <Text style={styles.finishText}>Close!</Text>
                        </TouchableOpacity>
                    </Modal>
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
    textUsername: {
        marginHorizontal: 50,
        marginVertical: 20,
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: 'lightgrey',
        borderRadius: 15,
        fontFamily: 'roboto'
    },
    usernameButton: {
        borderRadius: 15,
        marginHorizontal: 100,
        borderWidth: 1
    },
    timer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    finishText: {
        fontSize: 24,
        textAlign: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
        fontFamily: 'roboto'
    },
    firstText: {
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 10,
        textAlign: 'center',
        fontFamily: 'roboto'
    },
    secondText: {
        fontSize: 12,
        paddingVertical: 25,
        paddingHorizontal: 10,
        fontFamily: 'roboto'
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
        fontFamily: 'roboto'
    },
    finishView: {}
});


export default TestScreen;
