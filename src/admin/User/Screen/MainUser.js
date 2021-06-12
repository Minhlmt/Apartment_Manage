import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { ScreenKey } from '../../globals/constants'
import { Icon } from 'react-native-elements'
export default function MainUser(props) {

    const handleCreateUser=()=>{
        props.navigation.navigate(ScreenKey.CreateUser)
            
      
    }
    const handleListUser=()=>{
        props.navigation.navigate(ScreenKey.ListUser,{
            searchText:''
        });
    }
    return (
        <View>
            <View style={styles._title}>
                <Text style={styles._text_title} >{`User`}</Text>

            </View>
            <TouchableOpacity style={styles.container1} onPress={handleCreateUser}>

                <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }}  resizeMode='contain'  source={require('../../../../image/createuser.png')} />
                <Text style={styles.text}>Tạo tài khoản user </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.container1} onPress={handleListUser}>

                <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }}  resizeMode='contain'  source={require('../../../../image/billHistory.png')} />
                <Text style={styles.text}>Danh sách user </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
            
        </View>
    )
}
const styles = StyleSheet.create({
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 20,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 20,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
        justifyContent: 'space-between'


    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 20,
        marginTop:10,
        marginLeft:10
    },
})