import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './src/components/Welcome/Welcome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Tab_Home_Profile} from './src/globals/screen'
import Apartment from './src/components/Apartment/Apartment'
import { ScreenKey } from './src/globals/constants';
import SignIn from './src/components/SignIn/SignIn'
import messaging from '@react-native-firebase/messaging';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
import Firesase from '@react-native-firebase/app' 
import {PushNotify} from './src/globals/pushNotification'
const MainNavigationStack = createStackNavigator();
export default function App({navigation}) {
  const [checkToken, setCheckToken] = useState(false);
  const [notification,setNotification]=useState(true);
  const handleRefesh=()=>{
    setNotification(false);
  }
  useEffect(()=>{
    PushNotify(navigation,handleRefesh)
    // Firesase.initializeApp();
    
    // PushNotification.configure({
   
    //   onRegister: function (token) {
    //     console.log("TOKEN:", token);
    //   },
    
    
    //   onNotification: function (notification) {
    //     console.log("NOTIFICATION:", notification);
    //     setNotification(notification)
      
    //     // notification.finish(PushNotificationIOS.FetchResult.NoData);
    //   },
    
    //   onAction: function (notification) {
    //     console.log("ACTION:", notification.action);
    //     console.log("NOTIFICATION:", notification);
    
      
    //   },
    
     
    //   onRegistrationError: function(err) {
    //     console.error(err.message, err);
    //   },
    
     
    //   permissions: {
    //     alert: true,
    //     badge: true,
    //     sound: true,
    //   },
    
    
    //   popInitialNotification: true,
    
    
    //   requestPermissions: true,
    // });
  },[notification])

 


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