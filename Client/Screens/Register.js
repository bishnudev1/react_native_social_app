import { View, Text, Image, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'


const Register = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');


    const registerUser = async () => {

        if (!name || !email || !password || !cpassword) {
            Alert.alert('Error', 'Give all details', [{ text: 'Okay' }])
        }
        else {
            fetch("http://10.0.2.2:5000/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            })
                .then(res => res.json())
                .then(data => {
                    try {
                        //AsyncStorage.setItem('token', data.token);
                        //setIsloggedIn(true);
                        Alert.alert('Welcome', 'You have registered successfully');
                        navigation.navigate('Login');
                    } catch (error) {
                        Alert.alert('Error', 'Something went wrong', [{ text: 'Okay' }])
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
                    <Text style={styles.labelText}>Username</Text>
                    <TextInput value={name} onChangeText={(e) => setName(e)} style={styles.inputText} placeholderTextColor='gray' placeholder='Enter your name...' />
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={styles.inputText}
                        placeholderTextColor='gray' placeholder='Enter your email...' />
                    <Text style={styles.labelText}>Password</Text>
                    <TextInput value={password} onChangeText={(e) => setPassword(e)} style={styles.inputText}
                        placeholderTextColor='gray' placeholder='Enter your password...' />
                    <Text style={styles.labelText}>Confirm Password</Text>
                    <TextInput value={cpassword} onChangeText={(e) => setCpassword(e)} style={styles.inputText}
                        placeholderTextColor='gray' placeholder='Enter your password again...' />
                    <Text style={{ marginTop: 5 }}>By signing up you agree with our Terms & Conditions.</Text>
                    <TouchableOpacity onPress={registerUser} style={styles.loginbtn}>
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>Sign up</Text>
                    </TouchableOpacity>
                    <Text onPress={() => navigation.navigate('Login')} style={{ fontSize: 15, paddingTop: 5 }}>Already have an account ? Sign in</Text>
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

export default Register