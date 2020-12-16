import React from 'react';
import {StyleSheet,View, Text, TouchableOpacity} from "react-native";

export default class questionComponent extends React.Component {
    render(props) {
        return (
            <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.tags}>{this.props.tags}</Text>
                <Text numberOfLines={2} style={styles.text}>{this.props.description}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginVertical:10,
        flex: 1,
        backgroundColor: '#fff',
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 15
    },
    title:{
        fontSize: 18,
        paddingTop: 5,
        paddingLeft: 15,
        fontFamily: 'XDDD'
    },
    tags:{
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 15,
        fontFamily: 'XDDD'
    },
    text:{
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15,
        fontFamily: 'XDDD'
    }

})
