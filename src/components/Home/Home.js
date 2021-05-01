import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SectionList, Text, View, FlatList } from 'react-native';
import ItemNotification from './Items/ItemNotification';
import ItemService from './Items/ItemService';
import { ScreenKey } from '../../globals/constants'
import { ImageBackground } from 'react-native';
import CalDate from '../Services/Bill/CalDate'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dimensions } from 'react-native';
import { URL } from '../../globals/constants'
import { TouchableOpacity } from 'react-native';
var numeral = require('numeral');
const window = Dimensions.get('window');
export default function Home(props) {

  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [apartId, setApartId] = useState();
  const [token, setToken] = useState();
  const [flag, setFlag] = useState(true);
  const [sumMoney, setSumMoney] = useState();
  const [ruleDate, setRuleDate] = useState(10);
  const [bntComplain, setbtnComplain] = useState();
  const [is_pay,setIsPay]=useState();
  const [billId,setBillId]=useState();
  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const apartId = await AsyncStorage.getItem('apartId');

      if (token != null) {

        const _token = JSON.parse(token);
        const _apartId = JSON.parse(apartId);

        setApartId(_apartId);
        setToken(_token);
        setFlag(false);
      }

    } catch (e) {
      // error reading value
    }
  }
  const fetchData1 = async () => {
    const res = await fetch(URL + `api/all-bill/bill/${apartId}/${month}/${year}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },

    })
    if (res.status === 200) {
      const result = await res.json();
      setSumMoney(numeral(result.data.total_money.toString()).format('0,0'));
      setBillId(result.data.id);
      if(result.data.is_pay){
        setIsPay("Đã thanh toán");
      }
      else{
        setIsPay("Chưa thanh toán")
      }

    }

    // console.log("RESULT ",result)
  }
  const fetchData = async () => {
    await getData();
    await fetchData1()
  }

  useEffect(() => {
    var today = new Date("2021-08-11");
    let date = CalDate(today);
    let monthtoday, yeartoday;
    let preMonth = (date.mm - 1).toString();
    if (preMonth.length < 2) {
      preMonth = '0' + preMonth;
    }
    if (preMonth != 0) {
      monthtoday = preMonth;
      yeartoday = date.yyyy;
    }
    else {
      monthtoday = 12
      yeartoday = date.yyyy - 1;
    }
    setMonth(monthtoday);
    setYear(yeartoday);

    fetchData();
    if (parseInt(date.dd) >= ruleDate)
      return setbtnComplain(true);;
    return setbtnComplain(false);
  }, [month, year, flag])
  const handleUploadImage = () => {
    props.navigation.navigate(ScreenKey.Complain, {
      imageBase64: '',
      uri: '',
      width: '',
      height: '',
      mime: '',
      path: '',
      billId:billId
    });
  }
  return (
    // <ScrollView style={{flex: 1}}>
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
      <View style={styles.container1} >
        <View style={styles.background} >
          {/* <Image style={styles.image} source={require('../../../image/sea.jpg')} /> */}
          <ImageBackground source={require('../../../image/home.jpg')} style={styles.image}>
            <Text style={styles.text1} adjustsFontSizeToFit>Tiền cần thanh toán </Text>
            <Text style={styles.text2} adjustsFontSizeToFit>{sumMoney} VND</Text>
            <Text style={styles.text2} adjustsFontSizeToFit>{is_pay}</Text>
            {bntComplain && (<TouchableOpacity onPress={handleUploadImage}>
              <Text style={styles.text3} adjustsFontSizeToFit>Khiếu nại</Text>
            </TouchableOpacity>)} 

          </ImageBackground>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Service</Text>
      </View>
      <View style={styles.margin_top}>
        <View style={styles.service_h}>
          <ItemService id={ScreenKey.Bill} src='' name='Hóa đơn' navigation={props.navigation} />
          <ItemService id={ScreenKey.Repair} src='' name='Sửa chữa' navigation={props.navigation} />
          <ItemService name='' navigation={props.navigation} />
        </View>
      </View>
      <View style={styles.service_v}>
        <View style={styles.service_h}>
          <ItemService id={ScreenKey.NotifyRepair} name='TB sửa chữa' navigation={props.navigation} />
          <ItemService id={ScreenKey.Intro} name='Giới thiệu' navigation={props.navigation} />

          <ItemService src='' name='jhg' />
        </View>
      </View>
    </ImageBackground>
    // </ScrollView>
  )
}
const styles = StyleSheet.create({

  service_h: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  service_v: {
    marginTop: 40
  },
  margin_top: {
    marginTop: 15
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
    marginTop: window.height / 20,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10
    // backgroundColor: "#000000a0"
  },
  text2: {
    marginTop: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    // backgroundColor: "#000000a0"
  },
  text3: {
    marginTop: 10,
    color: "red",
    fontSize: 20,
   
    textAlign: "center",
    // backgroundColor: "#000000a0"
    textDecorationLine:'underline'
  }
});