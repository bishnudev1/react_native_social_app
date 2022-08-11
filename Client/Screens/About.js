import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
//import Axios from 'axios'

const About = () => {

    const [myName, setMyName] = useState('')
    const [myEmail, setMyEmail] = useState('')

    useEffect(() => {
        getUser();
    }, [])

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

    return (
        <ScrollView>
            <View style={{ height: '100%', padding: 20, backgroundColor: 'white' }}>
                <View>
                    <Text style={styles.headabouttext}>Your profile</Text>
                    {
                        myEmail ? (
                            <>
                                <Text style={styles.descabouttext}>Your name : {myName}</Text>
                                <Text style={styles.descabouttext}>Your email : {myEmail}</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.descabouttext}>You have not signed in</Text>
                            </>
                        )
                    }
                </View>
                <View>
                    <Text style={styles.headabouttext}>FAQ</Text>
                    <Text style={styles.descabouttext}>What's the purpose of this app ?</Text>
                    <Text style={styles.descabouttext}>To connect all worldwide developers together.</Text>
                    <Text style={styles.descabouttext}>Is my data secured in this app ?</Text>
                    <Text style={styles.descabouttext}>Yes.This app uses latest bcrypt technology to hash your password so that hackers can't break it.</Text>
                </View>
                <View>
                    <Text style={styles.headabouttext}>Policy</Text>
                    <Text style={styles.descabouttext}>This app is built by Bishnudev Khutia, a fullstack developer from India. All the information we collect from you to enhance your user experience with us. The information you provided is secured to our database.
                        @Copyright Developer's World 2022
                    </Text>
                </View>
                <View>
                    <Text style={styles.headabouttext}>Reach to us</Text>
                    <Text style={styles.descabouttext}>Enter your email</Text>
                    <TextInput style={{ borderWidth: 1, borderRadius: 10, borderColor: 'gray', marginBottom: 10, height: 35 }} />
                    <TouchableOpacity style={styles.myaboutbtn}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.headabouttext}>Developer</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Icon name='facebook' size={30} color='blue' />
                        <Icon name='github' size={30} color='black' />
                        <Icon name='linkedin' size={30} color='skyblue' />
                        <Icon name='instagram' size={30} color='violet' />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headabouttext: {
        fontSize: 23,
        paddingBottom: 10,
        color: 'gray'
    },
    descabouttext: {
        fontSize: 15,
        paddingBottom: 10,
        color: '#292f33'
    },
    myaboutbtn: {
        padding: 8,
        backgroundColor: '#9999',
        borderRadius: 10
    }
})

export default About
