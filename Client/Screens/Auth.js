import { View, Text, Image, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Axios from 'axios';


const Login = ({ navigation }) => {

    const [create, setCreate] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');

    const loginUser = async () => {
        if (!email || !password) {
            Alert.alert('Warning', 'Fill all details', [{ text: 'Okay' }]);
        }
        else {
            try {
                const resp = await Axios.post('http://10.0.2.2:5000/login', {
                    email,
                    password
                });
                if (resp.status === 201) {
                    Alert.alert('Success', 'Login successfull')
                    navigation.navigate('Home');
                }
                else {
                    Alert.alert('Error', 'Wrong crediantials')
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const registerUser = async () => {
        try {
            if (!name || !email || !password || !cpassword) {
                Alert.alert('Warning', 'Fill all details correctly', [{ text: 'Okay' }]);
            }
            if (password === cpassword) {
                const resp = await Axios.post('http://10.0.2.2:5000/register', {
                    name,
                    email,
                    password,
                    cpassword
                });
                if (resp.status === 201) {
                    Alert.alert('Success', 'Your data has been saved');
                    setName('');
                    setEmail('');
                    setPassword('');
                    setCpassword('');
                    navigation.navigate('Home');
                }
                else {
                    Alert.alert('Error', 'Something went wrong', [{ text: 'Understand' }]);
                }
            }
            else {
                Alert.alert('Warning', 'Passwords are not matching', [{ text: 'Okay' }]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={{ flex: 1, height: '100%', padding: 25, justifyContent: 'space-evenly', backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, paddingBottom: 0 }}>Developers World</Text>
                <Image style={styles.img} source={require('../Assets/Images/Login.png')} />
            </View>
            <View style={{ paddingBottom: 5 }}>
                {
                    create ? <View>
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
                        <Text onPress={() => setCreate(false)} style={{ fontSize: 15, paddingTop: 15 }}>Does not have an accout ? Sign up</Text>
                    </View> : <View>
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
                        <Text onPress={() => setCreate(true)} style={{ fontSize: 15, paddingTop: 15 }}>Already have an account ? Sign in</Text>
                    </View>
                }
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