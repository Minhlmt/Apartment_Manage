import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity,ImageBackground } from 'react-native';
// import {  URL } from '../../../globals/constants'

import Spinner from 'react-native-loading-spinner-overlay';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import {token,URL} from '../../../globals/constants'
var numeral = require('numeral');

export default function WaterBill({route}) {
    const [oldIndex, setOldIndex] = useState(0);
    const [newIndex, setNewIndex] = useState(0);
    const [sumIndex, setSumIndex] = useState(newIndex - oldIndex);
    const [sumPrice, setSumPrice] = useState('0');
    const [spinner, setSpinner] = useState(false);
    const{apartId,month,year}=route.params;
    const senddata = async () => {
        const res = await fetch(URL + `api/water-bill/month-bill/${apartId}/${month}/${year}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
       
       
      
        setSpinner(false);
        if (res.status === 200) {
            const result = await res.json();
            if(result.data!==null){
                setOldIndex(result.data.old_index);
                setNewIndex(result.data.new_index);
                setSumIndex(result.data.consume);
                var _sumPrice = numeral(result.data.total_money.toString()).format('0,0');
                setSumPrice(_sumPrice);
    
            }
            else{
                setOldIndex(0);
                setNewIndex(0);
                setUnitPrice(0);
                setSumIndex(0);
            }
          

        }


    }
    useEffect(() => {
        setSpinner(true);
        senddata()

    }, []);
    const handleClick = () => {
        setSpinner(true);
        // senddata();
    }


    return (
        <ImageBackground  style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bill3.jpg')}>
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
             
            <View style={styles.container}>
                <Text style={styles.text_title}>Danh mục</Text>
                <Text style={styles.text_title}>Thông số</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Chỉ số cũ</Text>
                <Text style={styles.text}>{oldIndex}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Chỉ số mới</Text>
                <Text style={styles.text}>{newIndex}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tổng tiêu thụ</Text>
                <Text style={styles.text}>{sumIndex} m3</Text>
            </View>
            {/* <View style={styles.container}>
                <Text style={styles.text}>Đơn giá</Text>
                <Text style={styles.text}>{unitPrice} đ/m3</Text>
            </View> */}
            <View style={styles.container}>
                <Text style={styles.text_sum}>Tổng tiền</Text>
                <Text style={styles.text_sum}>{sumPrice} đ</Text>
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
        fontSize: 20
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