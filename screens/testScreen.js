import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import Navbar from "../componets/navbar";


class TestScreen extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                <Navbar navigation={this.props.navigation} title="Test"/>
                <View style={styles.first}>
                    <Text style={styles.firstText}>Question 3 of 10</Text>
                    <Text style={styles.firstText}>Time: 28 sec</Text>
                </View>
                <View style={styles.second}>
                    <Text style={styles.firstText}>This is some example of a long question to fill the content?</Text>
                    <Text numberOfLines={2} style={styles.secondText}>Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Phasellus diam felis, dapibus vel purus id, iaculis euismod mi.
                        Duis nunc velit, elementum sed fermentum vitae, dignissim non urna. Integer quis odio
                        elementum lacus viverra fringilla. Morbi in feugiat sem. Integer convallis commodo est. Donec
                        sagittis luctus mattis.</Text>
                </View>
                <View style={styles.bottomAnswer}>
                    <TouchableOpacity style={styles.answer}><Text style={styles.answerText}>Answer A</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.answer}><Text style={styles.answerText}>Answer B</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.answer}><Text style={styles.answerText}>Answer C</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.answer}><Text style={styles.answerText}>Answer D</Text></TouchableOpacity>
                </View>
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
    bottomAnswer:{
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
    answerText:{
        fontSize: 16,
        textAlign: 'center',
    }
});


export default TestScreen;
