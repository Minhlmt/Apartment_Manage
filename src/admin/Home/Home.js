import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView, SectionList, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

import { ScreenKey, TokenContext, URL } from '../globals/constants'
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GradientHeader from "react-native-gradient-header";
const { width: WIDTH } = Dimensions.get('window')
export default function Home(props) {
  const token = useContext(TokenContext).token;
  const reload=useContext(TokenContext).reloadBadge;
  const [countParking, setCountParking] = useState(0);
  const [date, setDate] = useState('');
  const getNotifyParking = async () => {
    const res = await fetch(URL + `api/noti-parking/unconfirm`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': "application/json",
      },
    })
    if (res.status === 200) {
      const result = await res.json();
      setCountParking(result.unconfirm);
    }
  }
  useEffect(() => {
    getNotifyParking();
    var date = new Date();

    setDate(date.getDate() +
      "/" + (date.getMonth() + 1) +
      "/" + date.getFullYear())

    const unsubscribe = props.navigation.addListener('focus', () => {
      getNotifyParking();
    });


    return unsubscribe;
  }, [token, props.navigation])

  useEffect(()=>{
    getNotifyParking();
  },[reload])
  const deleteAsync = async () => {
    try {

      AsyncStorage.clear();

    } catch (e) {
      // error reading value
    }
  }
  const handleBill = () => {
    props.navigation.navigate(ScreenKey.MainBill)
  }
  const handleUser = () => {
    props.navigation.navigate(ScreenKey.AllUser)
  }
  const handleParking = () => {
    props.navigation.navigate(ScreenKey.Parking)
  }
  const hanldeLogout = () => {
    deleteAsync();
    props.navigation.navigate(ScreenKey.SignIn);
  }
  return (
    // <ScrollView style={{flex: 1}}>
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/background.jpg')}>
      <GradientHeader
        title={date}
        subtitle="Ch??o m???ng ng??y m???i"
        imageSource={require("../../../image/newday.jpg")}
      
      
        gradientColors={["#7F7FD5", "#86A8E7", "#91EAE4"]}
      />
      <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>

    
      <View style={styles.margin_top}>
        <View style={styles.service_h}>

          <View style={styles.shadow_button}>
            <TouchableOpacity style={styles.container} onPress={handleBill}>
              <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/billHome.png')} />
              <View>
                <Text style={styles.text}>H??a ????n</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.shadow_button}>
            <TouchableOpacity style={styles.container} onPress={handleUser}>
              <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/userHome.png')} />
              <View>
                <Text style={styles.text}>Ng?????i d??ng</Text>
              </View>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
      <View style={styles.service_v}>
        <View style={styles.service_h}>
        <View style={styles.shadow_button}>
            <TouchableOpacity style={styles.container} onPress={handleParking}>
              <View style={styles.badgeIconView}>
                <Text style={styles.badge}> {countParking} </Text>
                <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/parkingHome.png')} />
                <View>
                  <Text style={styles.text}>B??i xe</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.shadow_button}>
            <TouchableOpacity style={styles.container} onPress={hanldeLogout}>
              <Image resizeMode='contain' style={styles.tinyLogo} source={require('../../../image/logout.png')} />
              <View>
                <Text style={styles.text}>????ng xu???t</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <ItemService id={ScreenKey.Intro} name='Tr???ng' navigation={props.navigation} />

          <ItemService src='' name='Tr???ng' /> */}
        </View>
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
    marginTop: 170
  },
  shadow_button: {
    flex: 1,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 4,
    // backgroundColor:'red',

  },
  container: {
    display: 'flex',
    //   justifyContent:'center',
    alignItems: 'center',
    // backgroundColor:'transparent'

  },
  tinyLogo: {
    width: 80,
    height: 80,


  },
  logo: {
    width: 66,
    height: 58,
  },
  text: {
    color: 'black',
    marginBottom: 10,
    fontSize: 20
  },
  badgeIconView: {
    position: 'relative',
    padding: 5
  },
  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: 'red',
    borderRadius: 5
  }
});