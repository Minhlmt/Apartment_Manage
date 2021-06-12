import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateUser from '../CreateUser/CreateUser'
import ListUser from '../ListUser/ScreenUser'
import MainUser from './MainUser'

import {ScreenKey} from '../../globals/constants'
const UserStack = createStackNavigator();
export default function ScreenInfo() {
    return (
         <UserStack.Navigator>
             <UserStack.Screen name={ScreenKey.MainUser} component={MainUser} options={{headerShown:false}}/>
             <UserStack.Screen name={ScreenKey.CreateUser} component={CreateUser} options={{title:'Tạo tài khoản' }} />
             <UserStack.Screen name={ScreenKey.ListUser} component={ListUser} options={{ headerShown: false } } />
         </UserStack.Navigator>
    
    )
}