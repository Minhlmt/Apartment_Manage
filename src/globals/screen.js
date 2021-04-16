import React, { useEffect, useState, useCallback } from 'react';
import {StyleSheet,View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from './constants'
import Home from '../components/Home/Home'
import BillScreen from '../components/Services/Bill/Bill';
import RepairScreen from '../components/Services/Repair/ScreenRepair';
import ScreenInfo from '../components/Info/ScreenInfo'
import ScreenNotifyManage from '../components/Notify/ScreenNotifyManage'
import ScreenNotifyRepair from '../components/Services/NotifyRepair/ScreenNotifyRepair'
import Intro from '../components/Introduce/snippets'
const ServiceNavigationStack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
export const Stack_Home_Service = () => {
  return (
    <ServiceNavigationStack.Navigator initialRouteName={ScreenKey.HomeService}>
      <ServiceNavigationStack.Screen name={ScreenKey.HomeService} component={Home} options={{ title: 'Trang chủ', headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Bill} component={BillScreen} options={{ title: 'Hóa đơn' }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Repair} component={RepairScreen} options={{ title: 'Sửa chữa' }} />
      <ServiceNavigationStack.Screen name={ScreenKey.NotifyRepair} component={ScreenNotifyRepair} options={{ title: 'TB sửa chữa' }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Intro} component={Intro} options={{ title: 'Giới thiệu' , headerShown:false}} />

    </ServiceNavigationStack.Navigator>
  )
}
export const Tab_Home_Profile = () => {
  return (
    // <Tab.Navigator
    //   initialRouteName={ScreenKey.TabHome}
    //   tabBarOptions={{
    //     activeTintColor: '#e91e63',
    //     activeBackgroundColor:' rgba(0, 255, 159, 0.8)',

    //     labelStyle: {
    //       fontSize: 16,
    //       fontWeight: "bold",


    //     },
    //     backgroundColor:'red'
    //   }}
    // >
    //   <Tab.Screen
    //     name={ScreenKey.TabHome}
        
    //     component={Stack_Home_Service}
    //     options={{
    //       tabBarLabel: 'Trang chủ',
    //       tabBarIcon: () => (
    //         // <View style={styles.button_tab}>
    //               <Icon name="home" type='feather' color='#f1c40f' 
    //           size={30} />
    //         // </View>
          
    //       )
    //     }}
    //   />
    //   <Tab.Screen
    //     name={ScreenKey.TabNotify}
    //     component={ScreenNotifyManage}
    //     options={{
    //       tabBarLabel: 'Thông báo',
    //       tabBarIcon: () => (
    //         <Icon name="notifications-outline" type='ionicon' color='#f1c40f'
    //           size={30} />
    //       )
    //     }}
        
    //   />

    //   <Tab.Screen
    //     name={ScreenKey.TabProfile}
    //     component={ScreenInfo}

    //     options={{
    //       tabBarLabel: 'Cá nhân',
    //       tabBarIcon: () => (
    //         <Icon name='user'
    //           type='feather'
    //           color='#f1c40f'
    //           size={30}
    //         />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
    <Tab.Navigator
    initialRouteName={ScreenKey.TabHome}
    activeColor="#fff"
    
    shifting={true}
  >
    <Tab.Screen
      name={ScreenKey.TabHome}
      component={Stack_Home_Service}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: ' rgba(0, 184, 255, 1)',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      
      }}
    />
    <Tab.Screen
      name={ScreenKey.TabNotify}
      component={ScreenNotifyManage}
      options={{
        tabBarLabel: 'Updates',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name={ScreenKey.TabProfile}
      component={ScreenInfo}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
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
