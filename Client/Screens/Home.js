import { View, Text, Alert, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={{ height: '100%', backgroundColor: 'white' }}>
      <View style={{ justifyContent: 'space-between',height:'100%',padding:25 }}>
        <View>
          <Text style={{textAlign:'center',fontSize:25}}>Welcome Developer</Text>
        </View>
        <View>
          <Image style={styles.img} source={require('../Assets/Images/Dev.png')} />
          <Text style={{textAlign:'center',fontSize:18}}>A safe place where all developers interects with each other</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('Create profile')} style={styles.btncontainer}>
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
    borderRadius:10,
    marginBottom:10
  },
  btntext: {
    textAlign:'center',
    color:'white',
    fontWeight:'bold'
  }
});

export default Home