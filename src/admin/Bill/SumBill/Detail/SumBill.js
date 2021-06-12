import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';


import Spinner from 'react-native-loading-spinner-overlay';

var numeral = require('numeral');
import CalDate from './CalDate'
export default function SumBill({ route }) {
    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const [other, setOther] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);
    const [spinner, setSpinner] = useState(false);
    const { electric_bill, water_bill, other_bill, total_money } = route.params;
    useEffect(() => {
        setSpinner(true);
        setElectric(numeral(electric_bill.toString()).format('0,0'));
        setWater(numeral(water_bill.toString()).format('0,0'))
        setOther(numeral(other_bill.toString()).format('0,0'));
        setSumPrice(numeral(total_money.toString()).format('0,0'))
        setSpinner(false);

    }, []);

    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../../image/bill1.jpg')}>
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
                <Text style={styles.text}>Tiền điện</Text>
                <Text style={styles.text}>{electric} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tiền nước</Text>
                <Text style={styles.text}>{water} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Phí khác</Text>
                <Text style={styles.text}>{other} đ</Text>
            </View>

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
        color: '#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: 20,
        color: '#e67e22'
    }
});