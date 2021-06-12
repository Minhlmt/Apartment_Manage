import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import AllUser from './AllUser'
import DetailUser from './DetailUser'
import {URL,token,ScreenKey} from './../../globals/constants'

const SumBillStack = createStackNavigator();

export default function ScreenInfo({ route }) {
    const {searchText}=route.params;
     
    return (
   
        <SumBillStack.Navigator>
            <SumBillStack.Screen name={ScreenKey.AllUser} component={AllUser} options={{ headerShown: false }} initialParams={{searchText}}/>
            <SumBillStack.Screen name={ScreenKey.DetailUser} component={DetailUser} options={
                 ({ route }) => ({
                    title: route.params.name,
                })
            } />
           
        </SumBillStack.Navigator>
       
    )
}
