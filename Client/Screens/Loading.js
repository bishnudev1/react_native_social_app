import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import PushNotification from "react-native-push-notification";

const Loading = ({ navigation }) => {

  useEffect(() => {
    createChannels();
    setTimeout(() => {
      navigation.navigate('Home');
    }, 4000)
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "welcome",
        channelName: "Welcome to Developers World"
      }
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', height: '100%' }}>
      <ActivityIndicator color='#000' size='large' />
    </View>
  )
}

export default Loading