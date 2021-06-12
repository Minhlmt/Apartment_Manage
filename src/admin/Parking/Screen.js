import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Parking from './Parking'
import DetailParking from './DetailParking'
import {URL,ScreenKey} from '../globals/constants'
import ScreenListUser from '../User/ListUser/ScreenUser'
const SumBillStack = createStackNavigator();

export default function ScreenInfo({ route }) {
     
    return (
   
        <SumBillStack.Navigator>
            <SumBillStack.Screen name={ScreenKey.Parking} component={Parking} options={{ headerShown: false }} />
            <SumBillStack.Screen name={ScreenKey.DetailParking} component={DetailParking} options={{title:'Chi tiết'}} />
            <SumBillStack.Screen name={ScreenKey.AllUser} component={ScreenListUser} options={{headerShown:false}} />
        </SumBillStack.Navigator>
       
    )
}
