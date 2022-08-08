import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center'}}>
        <ActivityIndicator color='#000' size='large' />
    </View>
  )
}

export default Loading