import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Clipboard from '@react-native-clipboard/clipboard';

const Task = (props) => {
    const showToast = () => {
        Clipboard.setString(props.text)
    ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
  };
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.sqaure} onPress={() => showToast()}>
                    <Icon name="copy" size={22} color="#5b5f70" ></Icon>
                </TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <TouchableOpacity onPress={()=>{Alert.alert(props.text);}}><Icon name="expand" size={16} color="#5cadff" ></Icon></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        flex:1,
        borderColor:'#5cadff',
    borderWidth: 1

    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    sqaure: {
        width: 24,
        height: 24,
        marginRight: 15,

    },
    itemText: {
        maxWidth: '80%'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55bcf6',
        borderWidth: 2
    },
});

export default Task;