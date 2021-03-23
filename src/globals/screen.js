import React, { useEffect, useState, useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from './constants'
import { Icon } from 'react-native-elements'
import Home from '../components/Home/Home'
import BillScreen from '../components/Services/Bill/Bill';
import RepairScreen from '../components/Services/Repair/ScreenRepair';
import Profile from '../components/Info/Info'
const ServiceNavigationStack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const Stack_Home_Service = () => {
  return (
    <ServiceNavigationStack.Navigator initialRouteName={ScreenKey.HomeService}>
      <ServiceNavigationStack.Screen name={ScreenKey.HomeService} component={Home} options={{ title: 'Trang chủ', headerShown: false }} />
      <ServiceNavigationStack.Screen name={ScreenKey.Bill} component={BillScreen} options={{ title: 'Hóa đơn' }} />

      <ServiceNavigationStack.Screen name={ScreenKey.Repair} component={RepairScreen} options={{ title: 'Sửa chữa' }} />
    </ServiceNavigationStack.Navigator>
  )
}
export const Tab_Home_Profile = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenKey.TabHome}
      tabBarOptions={{
        activeTintColor: '#e91e63',
        labelStyle:{
          fontSize:20
        }
      }}
    >
      <Tab.Screen
        name={ScreenKey.TabHome}
        component={Stack_Home_Service}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <Icon name="home" type='feather' color='#f1c40f'
              size={30} />
          )
        }}
      />

      <Tab.Screen
        name={ScreenKey.TabProfile}
        component={Profile}
      
        options={{
          
          tabBarLabel: 'Profile',
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
