import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import QuestionComponent from '../componets/questionComponent'
import Navbar from "../componets/navbar";

class HomeScreen extends React.Component {
    state = {
        tests:[],
        isLoading: true
    }

    getQuizList = () => {
        fetch('http://tgryl.pl/quiz/tests')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    ...this.state,
                    tests: json,
                    isLoading: false
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    componentDidMount() {
        this.getQuizList();
    }

    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Navbar navigation={this.props.navigation} title="Home"/>
                {this.state.isLoading ? <Text>Loading...</Text> : (<SafeAreaView style={styles.safe}>
                    <ScrollView style={styles.scrollVi}>
                        {this.state.tests.map((item, key) => {
                            return (<QuestionComponent key={key} onPress={() => navigation.navigate('Test',{title: item.name, id: item.id,tags:item.tags})}
                                               title={item.name} tags={item.tags} description={item.description}/>)
                        })}
                        {/*<QuestionComponent title="Test wiedzy o pilce" tags="#4545" testNumber={2}/>*/}
                    </ScrollView>
                    <View style={styles.result}>
                        <Text style={styles.textResult}>Get to know your ranking result!</Text>
                        <TouchableOpacity style={styles.buttonResult} onPress={() => navigation.navigate("Test")}>
                            <Text>Check!</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safe: {
        flex: 6,
    },
    result: {
        borderWidth: 1,
        alignItems: 'center'
    },
    textResult: {
        fontSize: 18,
        marginBottom: 5
    },
    buttonResult: {
        backgroundColor: "lightgrey",
        fontSize: 25,
        paddingVertical: 5,
        paddingHorizontal: 50,
        marginBottom: 5
    },
    scrollVi: {
        marginHorizontal: 10,
        marginVertical: 10,
    },
    upperView:{
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'center',
    },
    upperText:{
        fontSize: 25,
        marginTop: 15,
        flexGrow: 1,
        textAlign: 'center'
    },
    upperButton:{
        backgroundColor:'lightgrey',
        fontSize:24,
        marginTop: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
    }
});

export default HomeScreen;
