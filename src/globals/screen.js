import React, { useEffect, useState, useCallback } from 'react';
import {StyleSheet,View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from './constants'
import { Icon } from 'react-native-elements'
import Home from '../components/Home/Home'
import BillScreen from '../components/Services/Bill/Bill';
import RepairScreen from '../components/Services/Repair/ScreenRepair';
import ScreenInfo from '../components/Info/ScreenInfo'
import ScreenNotifyManage from '../components/Notify/ScreenNotifyManage'
import ScreenNotifyRepair from '../components/Services/NotifyRepair/ScreenNotifyRepair'
const ServiceNavigationStack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const Stack_Home_Service = () => {
  return (
    <ServiceNavigationStack.Navigator initialRouteName={ScreenKey.HomeService}>
      <ServiceNavigationStack.Screen name={ScreenKey.HomeService} component={Home} options={{ title: 'Trang chủ', headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Bill} component={BillScreen} options={{ title: 'Hóa đơn' }} />

      <ServiceNavigationStack.Screen name={ScreenKey.Repair} component={RepairScreen} options={{ title: 'Sửa chữa' }} />
      <ServiceNavigationStack.Screen name={ScreenKey.NotifyRepair} component={ScreenNotifyRepair} options={{ title: 'TB sửa chữa' }} />

    </ServiceNavigationStack.Navigator>
  )
}
export const Tab_Home_Profile = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenKey.TabHome}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle: {
          fontSize: 16,
          fontWeight: "bold",


        },
    

      }}
    >
      <Tab.Screen
        name={ScreenKey.TabHome}
        
        component={Stack_Home_Service}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: () => (
            <View style={styles.button_tab}>
                  <Icon name="home" type='feather' color='#f1c40f' 
              size={30} />
            </View>
          
          )
        }}
      />
      <Tab.Screen
        name={ScreenKey.TabNotify}
        component={ScreenNotifyManage}
        options={{
          tabBarLabel: 'Thông báo',
          tabBarIcon: () => (
            <Icon name="notifications-outline" type='ionicon' color='#f1c40f'
              size={30} />
          )
        }}
      />

      <Tab.Screen
        name={ScreenKey.TabProfile}
        component={ScreenInfo}

        options={{
          tabBarLabel: 'Cá nhân',
          tabBarIcon: () => (
            <Icon name='user'
              type='feather'
              color='#f1c40f'
              size={30}
            />
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
