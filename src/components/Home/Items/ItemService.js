import  React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Image} from 'react-native';
import {Service} from '../../../globals/constants'
import {ScreenKey} from '../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ItemService(props){
  const [token,setToken]=useState('');
  const [apartId,setApartID]=useState('');
  const [userId,setUserId]=useState();
  const getData = async () => {
    try {
      const _token = await AsyncStorage.getItem('token');
      const _apartId=await AsyncStorage.getItem('apartId');
      const _userId=await AsyncStorage.getItem('infoUser');
     
        if (_token !== null&& _apartId!==null) {
          const _tokenObject=JSON.parse(_token);
          const _apartIdObject=JSON.parse(_apartId);
          const _userIdObject=JSON.parse(_userId);
          setToken(_tokenObject);
          setApartID(_apartIdObject);
          setUserId(_userIdObject.id)
      
      }
     
    } catch (e) {
      // error reading value
    }
  }
 useEffect(()=>{
   getData();
 },[])
  const handleClick=()=>{
    if(props.id===Service.Bill){
      props.navigation.navigate(ScreenKey.Bill,{
        token:token,
        apartId:apartId
      })
    }
    if(props.id===Service.Repair){
      props.navigation.navigate(ScreenKey.Repair)
    }
    if(props.id===Service.NotifyRepair){
      props.navigation.navigate(ScreenKey.NotifyRepair,{
        token:token,
        userId:userId
      })
    }
  }
    return(
        <TouchableOpacity style={styles.container} onPress={handleClick}>
            <Image style={styles.tinyLogo} source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}/>
        <View>
            <Text style={styles.text}>{props.name}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      display:'flex',
    //   justifyContent:'center',
      alignItems: 'center',
     
    },
    tinyLogo: {
      width: 50,
      height: 50,
     
    },
    logo: {
      width: 66,
      height: 58,
    },
    text:{
        color:'black',
       marginBottom:10,
        fontSize:20
    }
  });