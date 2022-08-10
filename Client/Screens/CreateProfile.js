import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import Axios from 'axios';


const CreateProfile = ({ navigation }) => {


  const addProfile = async () => {
    try {
      if (!name || !job || !work || !residence) {
        Alert.alert('Warning', 'Fill all details correctly', [{ text: 'Okay' }]);
      }
      else {
        const resp = await Axios.post('http://10.0.2.2:5000/add-profile', {
          name,
          job,
          work,
          residence
        });
        if (resp.status === 201) {
          Alert.alert('Success', 'Your developer profile has been saved',[
            {text: 'Go to developers feed', onPress:() => {navigation.navigate('Developers');}},
            {text: 'Create another profile', onPress:() => {navigation.navigate('Create profile')}}
          ]);
          
        }
        else {
          Alert.alert('Error', 'Something went wrong', [{ text: 'Understand' }]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [work, setWork] = useState('');
  const [residence, setResidence] = useState('');

  return (
    <View style={{ justifyContent: 'space-between', backgroundColor: 'white', padding: 25, height: '100%' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 25 }}>Create your developer profile</Text>
        <Image style={styles.img} source={require('../Assets/Images/Profile.png')} />
      </View>
      <View>
        <Text style={styles.devlabel}>Developer name</Text>
        <TextInput value={name} onChangeText={(e) => setName(e)} style={styles.devinputs} placeholder='Enter your username' />
        <Text style={styles.devlabel}>Developer work</Text>
        <TextInput value={job} onChangeText={(e) => setJob(e)} style={styles.devinputs} placeholder='Enter your work details' />
        <Text style={styles.devlabel}>Developer study</Text>
        <TextInput value={work} onChangeText={(e) => setWork(e)} style={styles.devinputs} placeholder='Enter your university name' />
        <Text style={styles.devlabel}>Developer residence</Text>
        <TextInput value={residence} onChangeText={(e) => setResidence(e)} style={styles.devinputs} placeholder='Enter your residence' />
        <TouchableOpacity onPress={addProfile} style={{ padding: 8, backgroundColor: 'orange', borderRadius: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Create profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 200
  },
  devlabel: {
    fontSize: 17,
    paddingVertical: 3
  },
  devinputs: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 5,
  }
})

export default CreateProfile
