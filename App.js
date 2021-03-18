import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/components/Welcome/Welcome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tab_Home_Profile} from './src/globals/screen'
import Apartment from './src/components/Apartment/Apartment'
import { ScreenKey } from './src/globals/constants';
import SignIn from './src/components/SignIn/SignIn'
const MainNavigationStack = createStackNavigator();
export default function App({navigation}) {
  const [checkToken, setCheckToken] = useState(false);
  
  
  // useEffect(()=>{
  //   const getData = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem('token');
  //         if (value !== null) {
  //         let valueObject = JSON.parse(value);
  //         setCheckToken(true)
  //         console.log(valueObject);
  //       }
  //       else {
  //         console.log(value);
  //         setCheckToken(false);
  //       }
  //     } catch (e) {
  //       // error reading value
  //     }
  //   }
  //  getData();
  
  // },[])
 
 


  return (
    <NavigationContainer>
      <MainNavigationStack.Navigator initialRouteName={ScreenKey.Welcome}>
        <MainNavigationStack.Screen name={ScreenKey.Home} component={Tab_Home_Profile} options={{ headerShown: false }} />
        <MainNavigationStack.Screen name={ScreenKey.Welcome}component={Welcome} options={{ headerShown: false }} />
        <MainNavigationStack.Screen name={ScreenKey.ChooseApart} component={Apartment} options={{headerShown:false}}/>
        <MainNavigationStack.Screen name={ScreenKey.SignIn} component={SignIn} options={{headerShown:false}}/>
      </MainNavigationStack.Navigator>
    </NavigationContainer>
  );
}