import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SumBill from './SumBill'
import ElectricBill from './ElectricBill'
import WaterBill from './WaterBill'
import OtherBill from './OtherBill'
import CalDate from './CalDate'
const Tab = createMaterialTopTabNavigator();
export default function Bill({route}){
  
    // const {token,apartId}=route.params;
    const {apartId,month,year,electric_bill,water_bill,other_bill,total_money}=route.params;
    return (
      
        <Tab.Navigator initialRouteName='SumBill'  
         tabBarOptions={{
            activeTintColor: '#e91e63',
            labelStyle: { fontSize: 14 ,  fontWeight: "bold",},
            style: { backgroundColor: 'powderblue' },
          }}>
            <Tab.Screen name="SumBill" component={SumBill} options={{tabBarLabel:'Tổng tiền'}} initialParams={{electric_bill,water_bill,other_bill,total_money}}/>
            <Tab.Screen name="ElectricBill" component={ElectricBill} options={{tabBarLabel:'Hóa đơn điện'}} initialParams={{apartId,month,year}}  />
            <Tab.Screen name="WaterBill" component={WaterBill} options={{tabBarLabel:'Hóa đơn nước'}} initialParams={{apartId,month,year}}  />
            <Tab.Screen name="OtherBill" component={OtherBill} options={{tabBarLabel:'Hóa đơn khác'}} initialParams={{apartId,month,year}}  />
           
        </Tab.Navigator>
      
    )
}