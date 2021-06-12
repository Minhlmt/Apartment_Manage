import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import ComplainDone from './ComplainDone'
import DetailComplainDone from './DetailComplainDone'
import {ScreenKey} from '../globals/constants'
const SumBillStack = createStackNavigator();

export default function ScreenInfo({ route }) {
     
    return (
   
        <SumBillStack.Navigator>
            <SumBillStack.Screen name={ScreenKey.ComplainDone} component={ComplainDone} options={{ headerShown: false }} />
            <SumBillStack.Screen name={ScreenKey.DetailComplainDone} component={DetailComplainDone} options={
                 ({ route }) => ({
                    title: route.params.name,
                })
            } />
        </SumBillStack.Navigator>
       
    )
}
