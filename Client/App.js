import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Auth from './Screens/Auth'
import Home from './Screens/Home'
import Loading from './Screens/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProfile from './Screens/CreateProfile'
import Developers from './Screens/Developers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {

  const [islogged, setIslogged] = useState(false);
  console.log(islogged);

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

  useEffect(() => {
    getToken();
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={
        islogged ? 'Auth' : 'Loading'
      }>
        <Stack.Screen options={{ headerShown: false }} name='Auth' component={Auth} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
        <Stack.Screen options={{ headerShown: false }} name='Loading' component={Loading} />
        <Stack.Screen options={{ headerShown: false }} name='Create profile' component={CreateProfile} />
        <Stack.Screen options={{ headerShown: false }} name='Developers' component={Developers} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App