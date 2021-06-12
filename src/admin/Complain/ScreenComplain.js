import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Complain from './Complain'
import DetailComPlain from './DetailComplain'
import { URL, token } from '../../globals/constants'
import {ScreenKey} from '../globals/constants'
const SumBillStack = createStackNavigator();

export default function ScreenInfo({ route }) {
     
    return (
   
        <SumBillStack.Navigator>
            <SumBillStack.Screen name={ScreenKey.Complain} component={Complain} options={{ headerShown: false }} />
            <SumBillStack.Screen name={ScreenKey.DetailComplain} component={DetailComPlain} options={
                 ({ route }) => ({
                    title: route.params.name,
                })
            } />
        </SumBillStack.Navigator>
       
    )
}
