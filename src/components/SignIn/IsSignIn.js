import React ,{useEffect,useState}from 'react';
import {Tab_Home_Profile} from '../../globals/screen'
 import SignIn from './SignIn.js'

import AsyncStorage from '@react-native-async-storage/async-storage';
 export default function IsSignIn(props){
    const [component,setComponent]=useState(<></>);
    useEffect(()=>{
        const getData = async () => {
          try {
            const value = await AsyncStorage.getItem('token');
              if (value !== null) {
                setComponent(<Tab_Home_Profile/>)
            }
            else {
             setComponent(<SignIn navigation={props.navigation}/>)
            }
          } catch (e) {
            // error reading value
          }
        }
       getData();
      
      },[])
     return(
        component
     )
 }