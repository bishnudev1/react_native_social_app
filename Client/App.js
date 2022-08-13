import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Register from './Screens/Register'
import Login from './Screens/Login'
import Home from './Screens/Home'
import About from './Screens/About'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CreateProfile from './Screens/CreateProfile'
import Developers from './Screens/Developers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from "react-native-push-notification";
import { UserContext } from './Api/UserContext';
import Icon from 'react-native-vector-icons/FontAwesome5'

const Drawer = createDrawerNavigator();

const App = () => {

  const [isloggedIn, setIsloggedIn] = useState(false);

  const getToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log("Token : " + token);
    if (token) {
      setIsloggedIn(true)
    }
    else {
      setIsloggedIn(false)
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
    <UserContext.Provider value={{ isloggedIn, setIsloggedIn }}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerType="slide"
          drawerStyle={{
            backgroundColor: "#0080ff",
            width: 250
          }}
          initialRouteName={
            isloggedIn ? 'Register' : 'Home'
          }>

          {
            isloggedIn ? (
              <>
                <Drawer.Screen
                  name='Home'
                  component={Home}
                  options={{
                    title: "Home",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='home'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='Create profile'
                  component={CreateProfile}
                  options={{
                    title: "Create Profile",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='user'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='Developers'
                  component={Developers}
                  options={{
                    title: "All Developers",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='code'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='About'
                  component={About}
                  options={{
                    title: "About",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='file'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
              </>
            ) : (
              <>
                <Drawer.Screen
                  name='Register'
                  component={Register}
                  options={{
                    title: "Register",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='user'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='Login'
                  component={Login}
                  options={{
                    title: "Login",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='user'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='Home'
                  component={Home}
                  options={{
                    title: "Home",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='home'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='Developers'
                  component={Developers}
                  options={{
                    title: "All Developers",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='code'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
                <Drawer.Screen
                  name='About'
                  component={About}
                  options={{
                    title: "About",
                    drawerIcon: ({ focused }) => (
                      <Icon
                        name='file'
                        size={focused ? 25 : 20}
                        color={focused ? 'blue' : 'pink'}
                      />
                    )
                  }}
                />
              </>
            )
          }
        </Drawer.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

export default App