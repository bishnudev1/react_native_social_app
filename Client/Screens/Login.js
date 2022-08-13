import { View, Text, Image, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../Api/UserContext';


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { isloggedIn, setIsloggedIn } = useContext(UserContext);

    const loginUser = async () => {
        if (!email || !password) {
            Alert.alert('Warning', 'Fill all details', [{ text: 'Okay' }]);
        }
        else {
            fetch('http://10.0.2.2:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                })
            })
                .then(res => res.json())
                .then(data => {
                    try {
                        AsyncStorage.setItem('token',data.token)
                        setIsloggedIn(true)
                        Alert.alert('Welcome back', 'Login successful')
                        navigation.navigate('Home')
                    } catch (error) {
                        Alert.alert('Error', 'Something went wrong', [{ text: 'Try again' }])
                    }
                })
        }
    }

    return (
        <View style={{ flex: 1, height: '100%', padding: 25, justifyContent: 'space-evenly', backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, paddingBottom: 0 }}>Developers World</Text>
                <Image style={styles.img} source={require('../Assets/Images/Login.png')} />
            </View>
            <View style={{ paddingBottom: 5 }}>
                <View>
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.inputText}
                        placeholderTextColor='gray' placeholder='Enter your email...' />
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput value={password} onChangeText={(e) => setPassword(e)} style={styles.inputText}
                        placeholderTextColor='gray' placeholder='Enter your password...' />
                    <Text style={{ marginTop: 5 }}>Forget your password ? Try resetting.</Text>
                    <TouchableOpacity onPress={loginUser} style={styles.loginbtn}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sign In</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Register')} style={{ fontSize: 15, paddingTop: 15 }}>Does not have an accout ? Sign up</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    img: {
        height: 250,
        width: '100%'
    },
    labelText: {
        fontSize: 17,
        paddingBottom: 2
    },
    inputText: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 2
    },
    loginbtn: {
        backgroundColor: 'blue',
        padding: 5,
        borderRadius: 10,
        marginTop: 10
    }
});

export default Login