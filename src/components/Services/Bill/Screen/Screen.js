import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Bill from '../Bill'
import NotifyBill from '../Notify/Notify'
import MainBill from './MainBill'
import {ScreenKey} from '../../../../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo() {
    return (
        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainBill} component={MainBill} options={{headerShown:false}}/>
            <BillStack.Screen name={ScreenKey.Bill} component={Bill} options={{ title: 'Hóa đơn' }} />
            <BillStack.Screen name={ScreenKey.NotifyBill} component={NotifyBill} options={{ headerShown: false } } />
        </BillStack.Navigator>
    
    )
}