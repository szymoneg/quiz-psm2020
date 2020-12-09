import React, {Component} from 'react';
import {StyleSheet, View, FlatList, RefreshControl,SafeAreaView} from 'react-native';
import {Table, Row} from 'react-native-table-component';
import Navbar from "../componets/navbar";

result = [
    {
        "nick": "Marek",
        "score": 18,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    },
    {
        "nick": "Marek",
        "score": 19,
        "total": 20,
        "type": "historia",
        "date": "2018-11-22"
    }
]

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}


class ResultScreen extends Component {
    state = {
        refreshing: false,
        setRefreshing: false,
    }

    onRefresh = (() => {
        this.setState({setRefreshing: true})
        wait(2000).then(() => this.setState({setRefreshing: false}));
    });

    Item = ({item}) => {
        return <Row data={[item.nick, item.score + '/' + item.total, item.type, item.date]}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <Navbar navigation={this.props.navigation} title="Home"/>
                <View style={styles.body}>
                    <Table>
                        <Row data={['nick', 'point', 'type', 'date']} style={styles.head} textStyle={styles.text}/>
                        <SafeAreaView>
                            <FlatList data={result}
                                      renderItem={this.Item}
                                      keyExtractor={(item, index) => index.toString()}
                                      refreshControl={<RefreshControl colors={["#9Bd35A", "#689F38"]}
                                                                      refreshing={this.state.refreshing}
                                                                      onRefresh={this.onRefresh}
                                      />}
                            />
                        </SafeAreaView>
                    </Table>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {flex: 1},
    body: {padding: 16, paddingTop: 30, backgroundColor: '#fff'},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6}
});

export default ResultScreen;
