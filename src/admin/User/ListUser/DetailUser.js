import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ImageBackground, Button, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, token } from './../../globals/constants'

import Spinner from 'react-native-loading-spinner-overlay';
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');
export default function Info(props) {
    const { name, email, phone, native_place, identify_card } = props.route.params.item;
    const { apartName, license_plates } = props.route.params;
    const [license, setLicense] = useState(props.route.params.license_plates)
    useEffect(() => {
        if (license === '') {
            setLicense("Không có")
        }



    }, [license])



    return (
       
            <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/background.jpg')}>
               <ScrollView>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='user'
                            type='feather'
                            color='#f1c40f'
                            size={30}
                        />
                        <Text style={styles.text} >Họ tên</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{name}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='email'
                            type='fontisto'
                            color='#e74c3c'
                            size={30}
                        />
                        <Text style={styles.text}>Email</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{email}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='phone-call'
                            type='feather'
                            color='#3498db'
                            size={30}
                        />
                        <Text style={styles.text}>Điện thoại</Text>
                    </View>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{phone}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='v-card'
                            type='entypo'
                            color='rgba(169, 76, 122, 0.9)'
                            size={30}
                        />
                        <Text style={styles.text}>CMND/Căn cước</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{identify_card}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='island'
                            type='fontisto'
                            color='#2ecc71'
                            size={30}
                        />
                        <Text style={styles.text}>Quê Quán</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{native_place}</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='building-o'
                            type='font-awesome'
                            color='#1abc9c'
                            size={30}
                        />
                        <Text style={styles.text}>Nhà</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', borderBottomWidth: 0.5 }}>
                    <Text style={styles.text_info}>{apartName}</Text>
                </View>
                <View style={styles.container}>
                    <View style={styles._row}>
                        <Icon name='credit-card'
                            type='feather'
                            color='#1abc9c'
                            size={30}
                        />
                        <Text style={styles.text}>Biển số xe</Text>
                    </View>

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.text_info}>{license}</Text>
                </View>
                </ScrollView>
            </ImageBackground>
      
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // justifyContent: 'space-between',
        margin: 5
    },
    _row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.7)',
        marginLeft: 10,

    },
    text_info: {
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.7)',
        marginTop: 5,
        flexWrap: 'wrap'


    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 25,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        // backgroundColor:'red'
    },
    myButton: {
        alignItems: 'center',
        // marginTop:10,

    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    myText: {
        fontSize: 20,

    },
    rowButton: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10
    },





    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    appButtonContainerLogOut: {
        elevation: 8,
        backgroundColor: "#e74c3c",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    container1: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 2
    },
    background: { // this shape is a circle 
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    image: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        backgroundColor: '#9DD6EB'
    },
    text1: {
        marginTop: window.height / 9.5,
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "#000000a0"
    }

});