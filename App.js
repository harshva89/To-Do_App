import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Keyboard,
  LogBox,
  Linking,
  ImageBackground,
  Alert,
} from 'react-native';

import Task from './Components/Tasks';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('taskItemsList1', jsonValue)
    } catch (e) {
      Alert.alert(e);
    }
  }

  const readData = async () => {
    try {
      const data = await AsyncStorage.getItem('taskItemsList1')

      if (data !== null) {
        setTaskItems(JSON.parse(data))
      }
    } catch (e) {
      alert(e)
    }
  }
  
  const removeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
    storeData(itemsCopy)
  }

  const deleteAll = () => {
    setTaskItems([])    
    storeData([])
  }

  const addNewTask = () => {
    console.log(task)
    Keyboard.dismiss();
    if(task!=undefined)
    {
      setTaskItems([...taskItems, task])    
      storeData([...taskItems, task])
    }
    else{
      Alert.alert("No text entered!")
    }
    setTask(null)
  }

  useEffect(() => {
    readData()
  }, [])

  return (
    <ImageBackground source={require('./Components/home.png')} resizeMode="cover" style={styles.image}>
    <View style={{display:'flex', flexDirection:'row'}}>
      <Text style={styles.heading}>To-Do List</Text>
      <TouchableOpacity
        style={styles.deleteAll}
        onPress={() =>{ deleteAll() }}>
          <Icon name="trash-o" size={33} color="#5cadff" ></Icon>
          <Text style={{fontSize:10}}>Delete All</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <View style={styles.eachTask}>
                  <Task key={index} text={item}></Task>
                  <TouchableOpacity style={styles.delete} onPress={()=>removeTask(index)}>
                    <Icon name="trash" size={24} color="#fc0000" ></Icon>
                  </TouchableOpacity>
                </View>
              ) 
            })
          }
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'New task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity
          onPress={() => addNewTask()}>
          <View style={styles.addWrapper}>
            <Icon name="plus-circle" size={33} color="#5cadff" ></Icon>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View >
    </ImageBackground>
  )
}

function About({ navigation }) {
  return(
    <ImageBackground source={require('./Components/about.png')} resizeMode="cover" style={styles.image}>
      <View style={styles.aboutView}>
        <Text style={styles.aboutText}>
          This is a simple To-Do app, used to store your tasks. New tasks can be added, and deleted. The data is stored in local storage using AsyncStorage.
        </Text>
        <Text>Made By:</Text>
        <Text style={styles.madeBy}>Harsh Vaswani</Text>
        <View style={{display:'flex', flexDirection:'row', paddingVertical:5}}>
          <Icon name="github" size={33} color="#000" ></Icon>
          <Text style={styles.hyplink}
          onPress={() => Linking.openURL('https://github.com/harshva89')}>GitHub
          </Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', paddingVertical:5}}>
          <Icon name="linkedin" size={33} color="#0077b5" ></Icon>
          <Text style={styles.hyplink}
          onPress={() => Linking.openURL('https://www.linkedin.com/in/harshvaswani89/')}>LinkedIn
          </Text>
        </View>
        <View style={{display:'flex', flexDirection:'row', paddingVertical:5}}>
          <Icon name="envelope" size={33} color="#FFF" ></Icon>
          <Text style={styles.hyplink}
          onPress={() => Linking.openURL('mailto:harshvaswani89@gmail.com')}>Mail
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}

const Drawer = createDrawerNavigator();
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="About" component={About} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  heading:{
    fontSize:35,
    padding:30,
    fontWeight:'bold',
    flex:1,
    marginTop:10,
    textShadowColor: 'rgba(0, 0, 0, 0.35)',
  textShadowOffset: {width: 2, height: 2},
  textShadowRadius: 10
  },
  deleteAll:{
    alignSelf:'flex-end',
    paddingBottom:22,
    marginRight:10,
    display:'flex',
    alignItems:'center'
  },
  hyplink: {
    color: '#064ea1',
    textDecorationLine: 'underline',
    fontSize: 20,
    paddingTop:3,
    paddingLeft:10
  },
  madeBy:{
    fontSize:22,
    paddingVertical:10
  },
  aboutView:{
    marginTop:100,
    padding:25,
  },
aboutText:{
  fontSize:18,
  textAlign: 'justify',
    marginBottom:30
},
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: 'bold',
    color:'#5b5f70'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    marginHorizontal:20,
    alignItems: 'center'
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderColor: '#5cadff',
    borderWidth: 1,
    flex:1
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight:20

  },
  eachTask:{
    display: 'flex',
    flexDirection: 'row',
  },
  delete:{
    paddingVertical:15,
    paddingLeft:15
  }
});