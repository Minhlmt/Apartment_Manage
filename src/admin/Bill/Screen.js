import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ComplainDone from '../ComplainDone/ScreenComplainDone'
import SumBill from './SumBill/ScreenSumAll'
import Statistic from './Statistic/Statistic'
import MainBill from './MainBill'
import {ScreenKey} from '../globals/constants'
const BillStack = createStackNavigator();
export default function ScreenInfo() {
    return (
        <BillStack.Navigator>
            <BillStack.Screen name={ScreenKey.MainBill} component={MainBill} options={{headerShown:false}}/>
            <BillStack.Screen name={ScreenKey.SumBill} component={SumBill} options={{ headerShown: false }} />
            <BillStack.Screen name={ScreenKey.Statistic} component={Statistic} options={{ headerShown: false } } />
            <BillStack.Screen name={ScreenKey.ComplainDone} component={ComplainDone} options={{ headerShown: false } } />
        </BillStack.Navigator>
    
    )
}