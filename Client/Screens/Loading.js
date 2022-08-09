import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'

const Loading = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Auth');
    },4000)
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', height: '100%' }}>
      <ActivityIndicator color='#000' size='large' />
    </View>
  )
}

export default Loading