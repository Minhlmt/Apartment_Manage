import React, { useEffect, useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login_Home } from './src/admin/globals/screen'
import Complain from './src/admin/Complain/ScreenComplain'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenContext,URL } from './src/admin/globals/constants'
import messaging from '@react-native-firebase/messaging';
// import PushNotification from "react-native-push-notification";
// import Firesase from '@react-native-firebase/app'
export default function ScreenInfo({ route }) {
    const [token, setToken] = useState('');
    const [refesh,setRefesh]=useState(true);
    const [loading, setLoading] = useState(true);
    const [reloadBadge,setReloadBadge]=useState(false);
    const changeRefesh=()=>{
        setRefesh(!refesh);
    }
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          // console.log(fcmToken);
          UpdateTokenDevice(fcmToken);
          console.log("Your Firebase Token is:", fcmToken);
        } else {
          console.log("Failed", "No token received");
        }
      }
      const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    
        if (enabled) {
          getFcmToken()
          // console.log('Authorization status:', authStatus);
        }
      }
    const sendUpdateTokenDevice = async (token_device, userId, token) => {
        const res = await fetch(URL + `api/auth/update-token-device-mobile`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: userId,
                token_device: token_device

            })
        })
        if (res.status === 200) {
            const result = await res.json();
        }
    }
    const getToken = async () => {
        try {
            const _token = await AsyncStorage.getItem('token');
            const infoUser=await AsyncStorage.getItem('infoUser');
            if (_token !== null) {
                const _tokenObject = JSON.parse(_token);
                const _infoUserObject=JSON.parse(infoUser);
                setToken(_tokenObject);

            }
        } catch (e) {

        }
    }
    const UpdateTokenDevice=async(token_device)=>{
        try {
            const _token = await AsyncStorage.getItem('token');
            const infoUser=await AsyncStorage.getItem('infoUser');
            if (_token !== null) {
                const _tokenObject = JSON.parse(_token);
                const _infoUserObject=JSON.parse(infoUser);
                await sendUpdateTokenDevice(token_device,_infoUserObject._id,_tokenObject);

            }
        } catch (e) {

        }
    }
    useEffect(() => {
        getToken();
        requestUserPermission();
        messaging().onMessage(async remoteMessage => {
          console.log('A new FCM message arrived!', remoteMessage);
          if (remoteMessage.data.type === "1") {
            storeDataNotifyBill(remoteMessage.data.type);
            setNotifyBill(true);
          }
          else{
            console.log("reload")
            setReloadBadge({...reloadBadge,reloadBadge:!reloadBadge})
          }
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
          );
    
        });
    
        // Check whether an initial notification is available
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log(
                'Notification caused app to open from quit state:',
                remoteMessage.notification,
              );
            }
            setLoading(false);
          });
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
    
        return unsubscribe;
    
      
    }, [refesh])
    if (loading) {
        return null;
      }
    return (
        <TokenContext.Provider value={{token,changeRefesh,reloadBadge}}>
            <NavigationContainer>
                <Login_Home />
            </NavigationContainer>
        </TokenContext.Provider>
    )
}
