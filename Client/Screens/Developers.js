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
            <View style={{ paddingVertical: 20, height: '100%' }}>
                <Text style={{ fontSize: 25, textAlign: 'center', paddingBottom: 20 }}>All developers</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={profile}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        return (
                            <View key={item._id} style={[styles.flatlist, styles.shadowProp]}>
                                <View style={{ backgroundColor: 'lightgrey', justifyContent: 'space-evenly', alignItems: 'center', padding: 15 }}>
                                    <Text style={styles.mydesc}>{item._id}</Text>
                                    <View style={{ flexDirection: 'row',width:'100%',justifyContent:'space-evenly' }}>
                                        <View>
                                            <Image style={styles.myimg} source={require('../Assets/Images/DP.png')} />
                                        </View>
                                        <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.mydesc}>{item.name}</Text>
                                                <Icon name='check' size={18} color='green' />
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={styles.mydesc}>{item.residence}</Text>
                                                <Icon name='home' size={18} color='green' />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.mydesc}>{item.work}</Text>
                                        <Text style={styles.mydesc}>{item.job}</Text>
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
