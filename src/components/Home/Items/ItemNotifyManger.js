import React, { useState, useEffect } from 'react';
import { StyleSheet,SectionList ,Text, View,Image, TouchableOpacity} from 'react-native';
import {ScreenKey} from '../../../globals/constants'
export default function ItemNotification(props){
    
    const handleClick=()=>{
       props.navigation.navigate(ScreenKey.NotifyDetailRepair,{
        notice_id:props.id,
        token:props.token
       })
    }
    return(
        <TouchableOpacity  style={props.is_read_user?styles.container1:styles.container2} onPress={handleClick}>
            <Image style={{width: 50, height: 50, borderRadius: 400/ 2}} source={require('')}/>
        <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "#EEEEEE",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding:10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
     
        
      },
      container2: {
        flexDirection: 'row',
        backgroundColor: "#BBBBBB",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 15,
        padding:10,
        paddingVertical: 20,
        paddingHorizontal: 15,
        elevation: 5,
      },
   text:{
       flex:1,
    color:'black',
     marginBottom:10,
    fontSize:20
}
  });