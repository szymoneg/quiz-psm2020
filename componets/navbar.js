import React from 'react';
import {StyleSheet,View, Text, TouchableOpacity} from "react-native";

class Navbar extends React.Component {
    render() {
        return (
            <View style={styles.upperView}>
                <TouchableOpacity style={styles.upperButton} onPress={()=>{this.props.navigation.openDrawer();}}><Text>Menu!</Text></TouchableOpacity>
                <Text style={styles.upperText}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    upperView:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'center',
        borderBottomWidth: 1
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

export default Navbar;

