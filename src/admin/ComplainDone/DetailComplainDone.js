import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity ,ScrollView,Alert} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
var numeral = require('numeral');
import {URL,token} from '../globals/constants'
import {ScreenKey} from '../globals/constants'
import { Dimensions } from 'react-native';


const window = Dimensions.get('window');
export default function DetailComplain(props){
    const {id,apart_name,electric_bill,water_bill,other_bill,total_money,is_pay,image}=props.route.params.item;
    const [_image,setImage]=useState();
    const {token}=props.route.params;
    console.log("ID ",id)
    const [electric,setElectric]=useState();
    const [water,setWater]=useState();
    const [other,setOther]=useState();
    const [sumPrice,setSumPrice]=useState();
    const getImage = async () => {
        const res = await fetch(URL + `api/uploadv2/image-url?key=${image[0]}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            console.log("URL ", result.imageUrl);
            setImage(result.imageUrl);
        }

    }

    useEffect(()=>{
        setElectric(numeral(electric_bill.toString()).format('0,0'));
        setWater(numeral(water_bill.toString()).format('0,0'))
        setOther(numeral(other_bill.toString()).format('0,0'))
        setSumPrice(numeral(total_money.toString()).format('0,0'))
        getImage();
    },[])

    const sendDataChangeIs_pay=async()=>{
        const res = await fetch(URL + `api/all-bill/change-pay`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bill_id: id ,
                status: true
            }),

        })
      
        if(res.status===200){
          const result = await res.json();
          if(result.data.is_pay)
          {
              setStatus('???? thanh to??n');
            
          }
        }
    }
    const sendDataChangeReport=async()=>{
        const res = await fetch(URL + `api/all-bill/change-report`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bill_id: id ,
                status: false
            }),

        })
        const result= await res.json();
        console.log("RESULT ",result);
        console.log("STATUS ",res.status);
    }
    const handleClickOk=async()=>{
        // await sendDataChangeIs_pay()
        // await sendDataChangeReport()
        Alert.alert(
            "Th??ng b??o",
            "???? gi???i quy???t khi???u n???i",
            [
              { text: "OK", onPress: () => props.navigation.navigate(ScreenKey.Complain) }
            ]
          );
    }
    const handleClickRefuse=()=>{
        //  sendDataChangeReport()
        Alert.alert(
            "Th??ng b??o",
            "???? t??? ch???i khi???u n???i",
            [
              { text: "OK", onPress: () => props.navigation.navigate(ScreenKey.Complain) }
            ]
          );
    }
    return(
        <ScrollView>
             <View style={styles.container}>
                <Text style={styles.text_title}>Danh m???c</Text>
                <Text style={styles.text_title}>Th??ng s???</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Nh??</Text>
                <Text style={styles.text}>{apart_name}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Ti???n ??i???n</Text>
                <Text style={styles.text}>{electric} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Ti???n n?????c</Text>
                <Text style={styles.text}>{water} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Ph?? kh??c</Text>
                <Text style={styles.text}>{other} ??</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text_sum}>T???ng ti???n</Text>
                <Text style={styles.text_sum}>{sumPrice} ??</Text>
            </View>
            <View style={styles.container1}>
                <Text style={styles.text}>H??nh ???nh</Text>
                

               
                <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height/2}
                       imageWidth={300}
                       imageHeight={300}
                       enableSwipeDown={true}
                       >
                        
                <Image style={{width:300, height:300}}
                       source={{uri:`${_image}`}}/>
                   
                       
            </ImageZoom>
          
            </View>
         
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    container1: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 20
    },
    text_title: {
        color: 'black',
        fontSize: 20,
        color: '#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: 20,
        color: '#e67e22'
    },
    tinyLogo: {
        width: window.width,
        
    },
  
});