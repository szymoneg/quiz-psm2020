import React from 'react';
import {StyleSheet,View, Text, TouchableOpacity} from "react-native";

export default class questionComponent extends React.Component {
    render(props) {
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.tags}>{this.props.tags}</Text>
                <Text numberOfLines={2} style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus diam felis, dapibus vel purus id, iaculis euismod mi.
                    Duis nunc velit, elementum sed fermentum vitae, dignissim non urna. Integer quis odio
                    elementum lacus viverra fringilla. Morbi in feugiat sem. Integer convallis commodo est. Donec sagittis luctus mattis. </Text>
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
    },
    tags:{
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 15,
    },
    text:{
        fontSize: 14,
        paddingTop: 5,
        paddingLeft: 15,
        paddingBottom: 5,
        paddingRight: 15
    }

})
