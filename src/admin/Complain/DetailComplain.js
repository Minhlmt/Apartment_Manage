import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity ,ScrollView,Alert} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
var numeral = require('numeral');
import {URL,token} from '../globals/constants'
import {ScreenKey} from '../globals/constants'
import { Dimensions } from 'react-native';


const window = Dimensions.get('window');
export default function DetailComplain(props){
    const {id,apart_name,electric_bill,water_bill,other_bill,total_money,is_pay,apart_id,image}=props.route.params.item;
    console.log("Author ",props.route.params.item);
    const [electric,setElectric]=useState();
    const [water,setWater]=useState();
    const [other,setOther]=useState();
    const [sumPrice,setSumPrice]=useState();
    const [status,setStatus]=useState();
    const [_image,setImage]=useState();
    const [tokenDevices, setTokenDevices] = useState();
    const getTokenDevice = async () => {
        const res = await fetch(URL + `api/user/token-device/${apart_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            
            setTokenDevices(result.token_device)
        }
    }
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
                title: "Khiếu nại hóa đơn",
                body: "Có thông báo mới",
                type: 1
            })

        })
        console.log("STATUS PUSH", res.status);
    }
    const getImage = async () => {
        const res = await fetch(URL + `api/uploadv2/image-url?key=${image[0]}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            console.log("URL ", result.imageUrl);
            setImage(result.imageUrl);
        }

    }
    useEffect(()=>{
        setElectric(numeral(electric_bill.toString()).format('0,0'));
        setWater(numeral(water_bill.toString()).format('0,0'))
        setOther(numeral(other_bill.toString()).format('0,0'))
        setSumPrice(numeral(total_money.toString()).format('0,0'))
        if(is_pay){
            setStatus("Đã thanh toán")
        }
        else{
            setStatus("Chưa thanh toán")
        }
        getImage();
        getTokenDevice();
    },[props.route.params.item.is_pay])

    const sendDataChangeIs_pay=async()=>{
        const res = await fetch(URL + `api/all-bill/change-pay`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bill_id: id ,
                status: true
            }),

        })
      
        if(res.status===200){
          const result = await res.json();
          if(result.data.is_pay)
          {
              setStatus('Đã thanh toán');
            
          }
        }
    }
    const sendDataChangeReport=async()=>{
        const res = await fetch(URL + `api/all-bill/change-report`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bill_id: id ,
                status: false
            }),

        })
        const result= await res.json();
       
    }
    const sendCreatNotifyDone=async()=>{
        const res = await fetch(URL + `api/bill-noti/create-confirm`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apart_id: apart_id ,
                title: 'Khiếu nại bạn đã được giải quyết',
                content:'BQL chung cư thông báo, khiếu nại của anh/chị đã được giải quyết. Đề nghị kiểm tra lại'
            }),
        })
        const result= await res.json();
    }
    const sendCreatNotifyNotDone=async()=>{
        const res = await fetch(URL + `api/bill-noti/create-confirm`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apart_id: apart_id ,
                title: 'Khiếu nại không hợp lệ. Liên hệ BQL để giải quyết',
                content:'BQL chung cư thông báo, khiếu nại của anh/chị chưa hợp lệ. Đề nghị liên hệ BQL để giải quyết '
            }),

        })
        const result= await res.json();
    }
    const handleClickOk=async()=>{
        await sendDataChangeIs_pay()
        await sendDataChangeReport();
         await pushNotify();
        await sendCreatNotifyDone()
        Alert.alert(
            "Thông báo",
            "Đã giải quyết khiếu nại",
            [
              { text: "OK", onPress: () => props.navigation.navigate(ScreenKey.Complain) }
            ]
          );
    }
    const handleClickRefuse=async()=>{
         await sendDataChangeReport()
         await sendCreatNotifyNotDone();
         await pushNotify();
        Alert.alert(
            "Thông báo",
            "Đã từ chối khiếu nại",
            [
              { text: "OK", onPress: () => props.navigation.navigate(ScreenKey.Complain) }
            ]
          );
    }
    return(
        <ScrollView>
             <View style={styles.container}>
                <Text style={styles.text_title}>Danh mục</Text>
                <Text style={styles.text_title}>Thông số</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Nhà</Text>
                <Text style={styles.text}>{apart_name}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}></Text>
                <Text style={styles.text}>{status}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tiền điện</Text>
                <Text style={styles.text}>{electric} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Tiền nước</Text>
                <Text style={styles.text}>{water} đ</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Phí khác</Text>
                <Text style={styles.text}>{other} đ</Text>
            </View>

            <View style={styles.container}>
                <Text style={styles.text_sum}>Tổng tiền</Text>
                <Text style={styles.text_sum}>{sumPrice} đ</Text>
            </View>
            <View style={styles.container1}>
                <Text style={styles.text}>Hình ảnh</Text>
                

               
                <ImageZoom cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height/2}
                       imageWidth={300}
                       imageHeight={300}
                       enableSwipeDown={true}
                       >
                        
                <Image style={{width:300, height:300}}
                       source={{uri:`${_image}`}}/>
                   
                       
            </ImageZoom>
            </View>
            <View style={styles.myButtonContainer}>
                <View style={styles.rowButton}>
                    <TouchableOpacity  style={styles.appButtonContainer} onPress={handleClickOk}>
                        <View style={styles.myButton}>
                            <Text style={styles.appButtonText}> Chấp nhận </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity  style={styles.appButtonContainer} onPress={handleClickRefuse}>
                        <View style={styles.myButton}>
                            <Text style={styles.appButtonText}>Không chấp nhận</Text>
                        </View>
                    </TouchableOpacity>
                </View>
    
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    container1: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: 20
    },
    text_title: {
        color: 'black',
        fontSize: 20,
        color: '#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: 20,
        color: '#e67e22'
    },
    tinyLogo: {
        width: window.width,
        
    },
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        marginBottom:10
        // backgroundColor:'red'
    },rowButton: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },   appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
});