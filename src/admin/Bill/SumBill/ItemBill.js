import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import {ScreenKey,URL} from '../../globals/constants'
var numeral = require('numeral');
 function ItemBill(props) {
     const [status,setStatus]=useState('');
     const [is_pay,setIs_pay]=useState();
     const [tokenDevices, setTokenDevices] = useState('');
     const getTokenDevice = async () => {
        const res = await fetch(URL + `api/user/token-device/${props.item.apart_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${props.token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            console.log("result token devices ",result)
            setTokenDevices(result.token_device)
        }
    }
     useEffect(()=>{
        getTokenDevice();
         if(props.item.is_pay){
             setIs_pay(true);
            setStatus('Đã thanh toán');
         }
         if(!props.item.is_pay){
             setIs_pay(false);
             setStatus('Chưa thanh toán');
         }
     },[props.item.is_pay])
    const handleClick=()=>{
        props.navigation.navigate(ScreenKey.DetailBill,{
            name:props.item.apart_name,
            status:status,
            billId: props.item.id,
            is_pay:is_pay,
            apartId: props.item.apart_id,
            month:props.item.month,
            year:props.item.year,
            electric_bill:props.item.electric_bill,
            water_bill:props.item.water_bill,
            other_bill:props.item.other_bill,
            total_money:props.item.total_money,
            tokenDevices
        })
    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container1} onPress={handleClick}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>Nhà: {props.item.apart_name}</Text>
                    <Text style={styles.sumPrice}>Tổng tiền: {numeral(props.item.total_money.toString()).format('0,0')} VND</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10,  }}>
                    <Text style={is_pay?styles.status_done:styles.status_false}>{status}</Text>
                    <Icon name='arrow-forward-ios'
                        type='material'
                        color='#3498db'
                        size={20}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
        justifyContent: 'space-between'


    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 20
    },
    status_done:{
        color:'blue'
    },
    status_false:{
        color:'red'
    },
    sumPrice:{
        color:'#800000'
    }
});
export default React.memo(ItemBill);