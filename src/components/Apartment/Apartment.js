import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL,Text_Size} from '../../globals/constants'
import {ScreenKey} from '../../globals/constants'
export default function Apartment(props) {
    const [apart,setApart]=useState([]);
    const {token,userId}=props.route.params;
    const [apartId,setApartId]=useState();
    const getInfoApart = async () => {
        
        const res = await fetch(URL+`api/apart/all-aparts/${userId}`, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + `${token}`,
            'Content-Type': 'application/json',
          },
    
        })
        const result=await res.json();
        let temp_apart=[];
        for(let t of result.data){
            const temp={
                label: "toa: "+t.block+" "+" nha: "+ t.name,
                value: t._id
            }
            temp_apart.push(temp);
         
        }
        setApartId(temp_apart[0].value);
        setApart(temp_apart);
    }
    
    useEffect(()=>{
        getInfoApart();
        
    },[token])

    const storeData = async (apartId) => {
        try {
          const jsonApartId = JSON.stringify(apartId);
          await AsyncStorage.setItem('apartId', jsonApartId);
          } catch (e) {
          // saving error
        }
      }
    const handleClick=()=>{
        
        storeData(apartId);
        props.navigation.navigate(ScreenKey.Home);
    }
        
    return (
        <View>
            <RadioForm
                radio_props={apart}
                // initial={0}
                onPress={(value) => {setApartId(value) }}
                               
            />
            <TouchableOpacity onPress={handleClick}>
           <View style={styles.container}>
                <Text style={styles.text_title}>Next</Text>
              
            </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    text_title: {
        color: 'black',
        fontSize: Text_Size.Text_title,
        color: '#3498db'
    },
});