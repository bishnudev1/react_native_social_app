import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Register from './Screens/Register'
import Login from './Screens/Login'
import Home from './Screens/Home'
import About from './Screens/About'
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
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

  const [myName, setMyName] = useState('')
  const [myEmail, setMyEmail] = useState('')


  const getUser = async () => {
    const token = await AsyncStorage.getItem("token")
    fetch('http://10.0.2.2:5000/User', {
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    }).then(res => res.json())
      .then(data => {
        setMyName(data.name)
        setMyEmail(data.email)
      })
  }

  useEffect(() => {
    getToken();
    getUser()
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

  const CustomDrawer = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: 'column-reverse', justifyContent: 'space-between', padding: 20, backgroundColor: '#f6f6f6', marginBottom: 20 }}>
          <View>
            {
              myName ? (
                <>
                  <Text style={{ paddingBottom: 3 }}>{myName}</Text>
                  <Text>{myEmail}</Text>
                </>
              ) : (
                <>
                  <Text>You have not signed in</Text>
                </>
              )
            }
          </View>
          <View style={{ paddingBottom: 10 }}>
            <Image style={{ height: 60, width: 60, borderRadius: 30 }} source={require('./Assets/Images/DP.png')} />
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    )
  }

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => < CustomDrawer {...props} />}
        //drawerType="slide"
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
                  //headerShown:false,
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
                  //headerShown:false,
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
    )
  }

  return (
    <UserContext.Provider value={{ isloggedIn, setIsloggedIn }}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  )
}

export default App