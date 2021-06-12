import React, { useEffect, useState, useCallback, useContext } from 'react';
import {StyleSheet,View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScreenKey ,URL,TokenContext} from './constants'
import Home from '../Home/Home'
import Bill from '../Bill/Screen'
import User from '../User/Screen/Screen'
import Complain from '../Complain/ScreenComplain'
import ComplainDone from '../ComplainDone/ScreenComplainDone'
import IsLogin from '../Login/IsLogin'
import Parking from '../Parking/Screen'
import Login from '../Login/Login'

const ServiceNavigationStack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const MainStack=createStackNavigator();
export const Stack_Home_Service = () => {
  return (
    <ServiceNavigationStack.Navigator initialRouteName={ScreenKey.HomeService}>
      <ServiceNavigationStack.Screen name={ScreenKey.Home} component={Home} options={{  headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.MainBill} component={Bill} options={{ headerShown:false}} />
      <ServiceNavigationStack.Screen name={ScreenKey.AllUser} component={User} options={{ headerShown:false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Parking} component={Parking} options={{ headerShown:false }} />
    </ServiceNavigationStack.Navigator>
  )
}
export const Tab_Home_Profile = () => {
 
  const [badge,setBadge]=useState(0);
  const reload=useContext(TokenContext).reloadBadge;
  const updateBadge = async () => {
    try {
        const _token = await AsyncStorage.getItem('token');
        if (_token !== null) {
            const _tokenObject = JSON.parse(_token);
          await getBadge(_tokenObject);

        }
    } catch (e) {

    }
}
  const getBadge=async(token)=>{
    console.log("token ",token);
    const res = await fetch(URL+`api/all-bill/all-report`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    // setSpinner(false);
    console.log("reload 2");
    if (res.status === 200) {
      const result = await res.json();
      console.log(result.data.length);
      setBadge(result.data.length);

    }
  }
  useEffect(()=>{
    updateBadge();
  },[reload])
  return (

    <Tab.Navigator
    initialRouteName={ScreenKey.TabHome}
    activeColor="#fff"
    
    shifting={true}
  >
    <Tab.Screen
      name={ScreenKey.TabHome}
      component={Stack_Home_Service}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarColor: ' rgba(0, 184, 255, 1)',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      
      }}
    />
    <Tab.Screen
      name={ScreenKey.TabComplain}
      component={Complain}
      options={{
        tabBarLabel: 'Khiếu nại',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
        tabBarBadge:`${badge}`
      }}
    />
  </Tab.Navigator>
  )
}
export const Login_Home=()=>{
  return(
    <MainStack.Navigator >
      <MainStack.Screen name={ScreenKey.Login} component={IsLogin} options={{  headerShown: false }} />
      <MainStack.Screen name={ScreenKey.TabHomeProfile} component={Tab_Home_Profile} options={{ headerShown:false}} />
      <MainStack.Screen name={ScreenKey.Home} component={Home} options={{  headerShown: false }} />
      <MainStack.Screen name={ScreenKey.SignIn} component={Login} options={{  headerShown: false }} />
    </MainStack.Navigator>
  )
}
const styles = StyleSheet.create({
  button_tab: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,

    elevation: 5,
    backgroundColor:'white'
  }
});
