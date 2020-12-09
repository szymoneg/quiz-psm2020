import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView,TouchableOpacity} from 'react-native';
import QuestionComponent from '../componets/questionComponent'
import Navbar from "../componets/navbar";

class HomeScreen extends React.Component {
    render() {
        let {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Navbar navigation={this.props.navigation} title="Home"/>
                <SafeAreaView style={styles.safe}>
                    <ScrollView style={styles.scrollVi}>
                        <QuestionComponent onPress={() => navigation.navigate('Test',{title: "Test wiedzy o papieszu",testNumber:1})}
                                           title="Test wiedzy o papieszu" tags="#123"/>
                        {/*<QuestionComponent title="Test wiedzy o pilce" tags="#4545" testNumber={2}/>*/}
                    </ScrollView>
                    <View style={styles.result}>
                        <Text style={styles.textResult}>Get to know your ranking result!</Text>
                        <TouchableOpacity style={styles.buttonResult} onPress={() => navigation.navigate("Test")}>
                            <Text>Check!</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
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
