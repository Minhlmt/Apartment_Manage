import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button,Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {ScreenKey} from '../../globals/constants'
import BillDetail from '../SumBill/Detail/Bill'
import AllBill from './MainSumBill'
import { URL, token } from '../../globals/constants'
const SumBillStack = createStackNavigator();
export default function ScreenInfo({ route }) {
    const {filterRadio}=route.params;
    return (
        <SumBillStack.Navigator>
            <SumBillStack.Screen name={ScreenKey.AllBill} component={AllBill} options={{ headerShown: false }} initialParams={{filterRadio}}/>
            <SumBillStack.Screen name={ScreenKey.DetailBill} component={BillDetail} options={
                ({ route }) => ({
                    title: route.params.name,
                    headerRight: (() => <ButtonRight billId={route.params.billId} is_pay={route.params.is_pay} tokenDevices={route.params.tokenDevices} status={route.params.status} />),
                })
            } />
        </SumBillStack.Navigator>
    )
}
function ButtonRight(props) {
    const [status, setStatus] = useState(props.status);
    const [is_pay, setIs_pay] = useState(props.is_pay);
    const [billId, setBillId] = useState(props.billId);
    console.log("asd ",props.tokenDevices)
    const [tokenDevices, setTokenDevices] = useState(props.tokenDevices);
  
     const pushNotify = async () => {
        console.log("token devices ",tokenDevices)
        const res = await fetch(URL + `api/push-noti/add-notice`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                tokens: [
                    `${tokenDevices}`
                ],
                title: "Hóa đơn",
                body: "Đã cập nhật tình trạng hóa đơn",
                type: 1
            })

        })
        console.log("STATUS PUSH", res.status);
    }
    const sendDataChangeIs_pay=async()=>{
        const res = await fetch(URL + `api/all-bill/change-pay`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bill_id: billId ,
                status: !is_pay
            }),
        })
        if(res.status===200){
          const result = await res.json();
          if(result.data.is_pay)
          {
              setStatus('Đã thanh toán');
              setIs_pay(true);
              pushNotify();
          }
          else{
            setStatus("Chưa thanh toán")
            setIs_pay(false);
            pushNotify();
          }
        }
    }
    const handleChangeIs_pay = () => {
        let content='';
        if(status==='Đã thanh toán')
        {
            content='Bạn có muốn Hủy thanh toán không?'
        }
        else{
            content='Xác nhận Đã thanh toán '
        }
        Alert.alert(
            "Xác nhận",
            `${content} `,
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK",
               onPress: () =>   sendDataChangeIs_pay()}
            ]
          );
    }
    return (
        <View>
            <TouchableOpacity  onPress={handleChangeIs_pay} style={{ marginRight: 10 }}>
                <Text style={is_pay ? styles.done : styles.notdone}>{status}</Text>
            </TouchableOpacity>
            
        </View>
    );
}
const styles = StyleSheet.create({
   done:{
       color:'blue',
       fontSize:18
   },
   notdone:{
       color:'red',
       fontSize:18
   }

});