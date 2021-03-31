import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenKey } from '../../../globals/constants'
import NotifyRepair from './NotifyRepair'
import NotifyDetailRepair from './NotifyDetailRepair'
const ScreenManage=createStackNavigator();
export default function ScreenNotifyManage({route}){
    const {token,userId}=route.params;
    return(
        <ScreenManage.Navigator>
            <ScreenManage.Screen name={ScreenKey.NotifyRepair} component={NotifyRepair} options={{headerShown:false}}
            initialParams={{token:token,userId:userId}}/>
            <ScreenManage.Screen name={ScreenKey.NotifyDetailRepair} component={NotifyDetailRepair}   options={{headerShown:false}}
      />
        </ScreenManage.Navigator>
    )
}