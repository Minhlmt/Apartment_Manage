import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {URL,token} from '../../../globals/constants'
var numeral = require('numeral');
import CalDate from './CalDate'
export default function ElectricBill({ route }) {
  const [park,setPark]=useState(0);
  const [garbage,setGarbage]=useState(0);
  const [maintenance,setMaintenance]=useState(0);
  const [apart_manage,setApartManage]=useState(0);
  const [other,setOther]=useState(0);
  const [note,setNote]=useState('');
  const [spinner, setSpinner] = useState(false);
  const [sumPrice,setSumPrice]=useState(0);
  const{apartId,month,year}=route.params;

  
  const senddata = async () => {
      const res = await fetch(URL+`api/other-bill/month-bill/${apartId}/${month}/${year}`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
      })
     
      setSpinner(false);
      if(res.status===200)
      {
        const result = await res.json();
        console.log("RESULT ",result);
         if(result.data!==null){
            let _apart_manage=numeral(result.data.apart_management.toString()).format('0,0');
            setApartManage(_apart_manage);
            let _park=numeral(result.data.parking_fees.toString()).format('0,0');
            setPark(_park);
            let _maintenance=numeral(result.data.maintenance_fee.toString()).format('0,0');
            setMaintenance(_maintenance);
            let _garbage=numeral(result.data.service_charge.toString()).format('0,0');
            setGarbage(_garbage);
            let _other=numeral(result.data.other_fees.toString()).format('0,0');
            setOther(_other);
            let _sumPrice= result.data.apart_management+result.data.parking_fees+result.data.maintenance_fee
            +result.data.service_charge+result.data.other_fees;
            let _sumPriceFormat=numeral(_sumPrice.toString()).format('0,0');
            setNote(result.data.note);
           setSumPrice(_sumPriceFormat);
         }
         else{
            setApartManage(0);
            setPark(0);
            setMaintenance(0);
            setGarbage(0);
            setOther(0);
            setSumPrice(0);

         }
        
      }
    
    }
  useEffect(() => {
      setSpinner(true);
    senddata();
    
  }, []);
 
    return (
        <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bill4.jpg')}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
           
            <View style={styles.container}>
                <Text style={styles.text_title}>Danh m???c</Text>
                <Text style={styles.text_title}>S??? ti???n</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Gi??? xe</Text>
                <Text style={styles.text}>{park} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Ph?? ????? r??c</Text>
                <Text style={styles.text}>{garbage} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Qu???n l?? chung c??</Text>
                <Text style={styles.text}>{apart_manage} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>B???o tr?? chung c??</Text>
                <Text style={styles.text}>{maintenance} ??</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Ph?? kh??c</Text>
                <Text style={styles.text}>{other} ??</Text>
            </View>
            <View style={styles.container}>
             
                <Text style={styles.text}>Ghi ch??: {note} </Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text_sum}>T???ng ti???n</Text>
                <Text style={styles.text_sum}>{sumPrice} ??</Text>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
    text_title: {
        color: 'black',
        fontSize: 20,
       color:'#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: 20,
       color:'#e67e22'
    }
});