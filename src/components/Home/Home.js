import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, SectionList ,Text, View,FlatList} from 'react-native';
import ItemNotification from './Items/ItemNotification';
import ItemService from './Items/ItemService';
import {Service} from '../../globals/constants'
const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ];
export default function Home(props) {
    return (
        <ScrollView>
           <View>
               <Text style={styles.title}>Service</Text>
           </View>
           <View style={styles.margin_top}>
           <View style={styles.service_h}>
               <ItemService id={Service.Bill} src='' name='Hóa đơn' navigation={props.navigation}/>
               <ItemService id={Service.Repair} src='' name='Sửa chữa' navigation={props.navigation}/>
               <ItemService  name='' navigation={props.navigation}/>
           </View>
           </View>
           <View style={styles.service_v}>
           <View style={styles.service_h}>
               <ItemService id={Service.NotifyRepair} name='TB sửa chữa' navigation={props.navigation}/>
               <ItemService src='' name='opl'/>

               <ItemService src='' name='jhg'/>
           </View>
           </View>
          
           
        </ScrollView>
    )
}
const styles = StyleSheet.create({
   
    service_h:{
        flexDirection:'row',
        justifyContent:'space-around'
    },
    title:{
       fontSize:20,
       fontWeight:'bold'
    },
    service_v:{
        marginTop:40
    },
    margin_top:{
        marginTop:15
    }
  });