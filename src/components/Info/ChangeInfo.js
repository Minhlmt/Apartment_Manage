import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button, TextInput,Alert } from 'react-native';
import { Text_Size, URL } from '../../globals/constants'
import {ScreenKey} from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
export default function ChangeInfo(props) {
  const {name,user_id, email, phone,identify_card,native_place,token } = props.route.params;
  const [newEmail, setNewEmail] = useState(email);
  const [newPhone, setNewPhone] = useState(phone);
  const [spinner, setSpinner] = useState(false);
  const getData = async () => {
    try {
        const infoUser = await AsyncStorage.getItem('infoUser');
       console.log(infoUser);
       

    } catch (e) {
        // error reading value
    }
}
  const sendDataUpdate = async () => {
    const storeData = async (infoUser) => {
      try {
        const jsonInfoUser = JSON.stringify(infoUser);
        await AsyncStorage.setItem('infoUser', jsonInfoUser);
      } catch (e) {
        // saving error
      }
    }

    const res = await fetch(URL + `api/auth/update-info`, {
        method: 'PUT',
        headers: {
            Authorization: 'Bearer ' + `${token}`,
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          user_id,name,
          phone:newPhone,
          email:newEmail,
          identify_card,native_place
        })

    })
    const result = await res.json();
    if(res.status===200){
      setSpinner(false);
      storeData(result.data);
      getData();
      Alert.alert(
        "Thông báo",
        "Cập nhật thành công",
        [
          {
            text: "Ok",
            onPress: () => props.navigation.navigate(ScreenKey.TabProfile),
            
          },
         
        ]
      );
  
    }
   
}
  const handleUpdateInfo=()=>{
    setSpinner(true);
    sendDataUpdate();
    
  }
  return (
    <View>
       <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
      <View style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.text_input}
          // placeholder={email}
          multiline
          defaultValue={newEmail}
          
          onChangeText={text => setNewEmail(text)} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Số điện thoại</Text>
        <TextInput
          style={styles.text_input}
          // placeholder={phone}
          // multiline
          defaultValue={newPhone}
          onChangeText={text => setNewPhone(text)} />
          
      </View>
      <View style={styles.myButtonContainer}>
        <TouchableOpacity onPress={handleUpdateInfo} style={styles.appButtonContainerLogOut}>
          <View style={styles.myButtonLogOut}>
            <Text style={styles.appButtonText}>Cập nhật</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  button_image: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10
    // justifyContent:'center'

  },
  text: {
    color: 'black',
    fontSize: Text_Size.Text,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text_input: {
    color: 'black',
    fontSize: Text_Size.Text,
    borderBottomWidth: 1,
    borderColor: '#2ecc71',
    marginLeft: 10,
    marginRight: 10

  },
  myButtonContainer: {
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    // backgroundColor:'red'
},
appButtonContainerLogOut: {
  elevation: 8,
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 12, marginTop: 15,
  marginLeft:10,
  marginRight:10
},
myButtonLogOut: {
  alignItems: 'center',
  // marginTop:10,

},
appButtonText: {
  fontSize: 18,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
  textTransform: "uppercase",

},
});