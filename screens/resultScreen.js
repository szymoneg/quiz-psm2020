import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell} from 'react-native-table-component';
import Navbar from "../componets/navbar";


class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            HeadTable: ['Nick', 'Points', 'Type', 'Date'],
            DataTable: [
                ['nick', '18/20', 'test1', '12-03-2007'],
                ['nick', '18/20', 'test1', '12-03-2007'],
                ['nick', '18/20', 'test1', '12-03-2007'],
                ['nick', '18/20', 'test1', '12-03-2007'],
            ],
        }
    }

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <Navbar navigation={this.props.navigation} title="Home"/>
                <View style={styles.body}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={state.HeadTable} style={styles.head} textStyle={styles.text}/>
                        <Rows data={state.DataTable} textStyle={styles.text}/>
                    </Table>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{flex: 1},
    body: { padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6}
});

export default ResultScreen;
