import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Auth from './Screens/Auth'
import Home from './Screens/Home'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CreateProfile from './Screens/CreateProfile'
import Developers from './Screens/Developers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";

const Drawer = createDrawerNavigator();

const App = () => {

  const [islogged, setIslogged] = useState(null);
  console.log(islogged);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("Token : " + token);
    if (token) {
      setIslogged(true)
    }
    else {
      setIslogged(null)
    }
  }

  useEffect(() => {
    getToken();
    createChannels();
  }, [])

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "welcome",
        channelName: "Welcome to Developers World"
      }
    )
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={
        islogged ? 'Auth' : 'Home'
      }>

        {
          islogged ? (
            <>
              <Drawer.Screen name='Home' component={Home} />
              <Drawer.Screen name='Create profile' component={CreateProfile} />
              <Drawer.Screen name='Developers' component={Developers} />
            </>
          ) : (
            <>
              <Drawer.Screen name='Auth' component={Auth} />
              <Drawer.Screen name='Home' component={Home} />
              <Drawer.Screen name='Developers' component={Developers} />
            </>
          )
        }
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default App