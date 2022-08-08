import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Axios from 'axios';


const Developers = () => {

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        getProfileData();
    }, [])

    const getProfileData = () => {
        Axios.get('http://10.0.2.2:5000/get-profiles').then((resp) => {
            const data = resp.data;
            setProfile(data);
        })
    }

    return (
        <View>
            <View style={{ padding: 20, height: '100%' }}>
                <Text style={{ fontSize: 25, textAlign: 'center', paddingBottom: 20 }}>All developers</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={profile}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={[styles.flatlist, styles.shadowProp]}>
                                <View style={{ backgroundColor: 'skyblue', justifyContent: 'space-around', alignItems: 'center', padding: 5, borderRadius: 20 }}>
                                    <Text style={styles.mydesc}>{item._id}</Text>
                                    <Image style={styles.myimg} source={require('../Assets/Images/DP.png')} />
                                    <View style={{ flexDirection: 'row' }}>
                                        <View>
                                            <Text style={styles.mydesc}>{item.name}</Text>
                                            <Text style={styles.mydesc}>{item.work}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.mydesc}>{item.job}</Text>
                                            <Text style={styles.mydesc}>{item.residence}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon style={{ padding: 10 }} name='facebook' color='blue' size={30} />
                                        <Icon style={{ padding: 10 }} name='github' color='black' size={30} />
                                        <Icon style={{ padding: 10 }} name='youtube' color='red' size={30} />
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    myimg: {
        height: 100,
        width: 100,
        borderRadius: 100
    },
    mydesc: {
        fontSize: 17,
        paddingVertical: 9,
        paddingHorizontal: 10,
        color: 'black'
    },
    shadowProp: {
        shadowColor: 'blue',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    flatlist: {
        padding: 10
    }
})

export default Developers
