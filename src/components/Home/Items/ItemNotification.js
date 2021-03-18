import React, { useState, useEffect } from 'react';
import { StyleSheet,SectionList ,Text, View,Image, TouchableOpacity} from 'react-native';
export default function ItemNotification(props){
    return(
        <TouchableOpacity style={styles.container}>
            <Image style={{width: 50, height: 50, borderRadius: 400/ 2}} source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}/>
        <Text style={styles.text}>ok chua ban quan ly chung cu thong bao ve viec thu tien nha</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
   container:{
       flexDirection:'row',
       backgroundColor:"#BDC3C7",
       borderBottomColor:'gray',
       borderBottomWidth:1,
       marginTop:5
   },
   text:{
       flex:1,
    color:'black',
     marginBottom:10,
    fontSize:20
}
  });