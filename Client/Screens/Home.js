import { View, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import PushNotification from "react-native-push-notification";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const [islogged, setIslogged] = useState(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("Token : " + token);
    if (token) {
      setIslogged(true)
    }
    else {
      setIslogged(false)
    }
  }

  const createProfile = () => {
    if (islogged === false) {
      Alert.alert('Warning', 'You must be logged in to create your developer account', [
        { text: 'Log in', onPress: () => navigation.navigate('Auth') },
        { text: 'Cancel', onPress: () => console.log('Cancel') }
      ])
    }
    else if(islogged === true){
      console.log('Nikal bsdk')
      navigation.navigate('Create profile')
    }
  }

  useEffect(() => {
    showNotify();
    getToken();
  }, []);

  const showNotify = () => {
    PushNotification.localNotification({
      channelId: "welcome",
      title: "Welcome to Developers world",
      message: "Create your free developer account now"
    })
  }

  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'space-between', height: '100%', padding: 25 }}>
        <View>
          <Text style={{ textAlign: 'center', fontSize: 25 }}>Welcome Developer</Text>
        </View>
        <View>
          <Image style={styles.img} source={require('../Assets/Images/Dev.png')} />
          <Text style={{ textAlign: 'center', fontSize: 18 }}>A safe place where all developers interects with each other</Text>
        </View>
        <View>
          <TouchableOpacity onPress={createProfile} style={styles.btncontainer}>
            <Text style={styles.btntext}>Create my profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Developers')} style={styles.btncontainer}>
            <Text style={styles.btntext}>Developer feed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: '100%'
  },
  btncontainer: {
    padding: 8,
    backgroundColor: 'darkviolet',
    borderRadius: 10,
    marginBottom: 10
  },
  btntext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});

export default Home