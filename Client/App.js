import { View, Text } from 'react-native'
import React from 'react'
import Auth from './Screens/Auth'
import Home from './Screens/Home'
import Loading from './Screens/Loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import CreateProfile from './Screens/CreateProfile'
import Developers from './Screens/Developers';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Loading'>
        <Stack.Screen options={{headerShown:false}} name='Auth' component={Auth} />
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home} />
        <Stack.Screen options={{headerShown:false}} name='Create profile' component={CreateProfile} />
        <Stack.Screen options={{headerShown:false}} name='Developers' component={Developers} />
        <Stack.Screen options={{headerShown:false}} name='Loading' component={Loading} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App