import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalDate from '../Bill/CalDate'
import { Text_Size, URL } from '../../../globals/constants'
import { ScreenKey } from '../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Repair(props) {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('123');
  const [token, setToken] = useState('');
  const [apartId, setApartId] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(true);
  const [flag2, setFlag2,] = useState(true);
  const [image, setImage] = useState(null);
  const { imageBase64, uri, width, height, mime } = props.route.params;
 
  
  const getData = async () => {

    try {
      console.log("123 " + userId + " " + token + " " + apartId);
      const _token = await AsyncStorage.getItem('token');
      const _apartId = await AsyncStorage.getItem('apartId');
      const _userId = await AsyncStorage.getItem('infoUser');


      if (_token !== null && _apartId !== null && _userId !== null) {

        const _tokenObject = JSON.parse(_token);
        const _apartIdObject = JSON.parse(_apartId);
        const _userIdObject = JSON.parse(_userId);
        // console.log(userId+" "+token+" "+apartId);
        setUserId(_userIdObject.id);
        setToken(_tokenObject);
        setApartId(_apartIdObject);
        setFlag2(false);
        console.log(userId + " " + token + " " + apartId);
      }

    } catch (e) {
      // error reading value
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let date = CalDate(currentDate);
    let string_date = date.dd + '/' + date.mm + '/' + date.yyyy
    console.log(string_date);


  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const checkTextInput = () => {
    //Check for the Name TextInput
    if (!topic.trim()) {
      Alert.alert('Thông báo','Chủ đề không được trống');
      return;
    }
    //Check for the Email TextInput
    if (!content.trim()) {
      Alert.alert('Thông báo','Nội dung không được trống');
      return;
    }
    //Checked Successfully
    //Do whatever you want
    alert('Success');
  };
  useEffect(() => {
    console.log("123 ");
    getData();
    setFlag(false);
    setImage({
      uri: uri,
      width: width,
      height: height,
      mime: mime,

    })

  }, [flag, flag2,props.route.params?.imageBase64])
  const renderAsset = (image) => {

    return (<Image
      style={{ width: 100, height: 100, resizeMode: 'contain' }}
      source={image}
    />);
  }
  const hanldeChooseImage = () => {
    props.navigation.navigate(ScreenKey.ChooseImage)
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Chủ đề</Text>
        <TextInput style={styles.text_input}
          placeholderTextColor="#FF0000"
          multiline
          onChangeText={text => setTopic(text)}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Nội dung</Text>
        <TextInput style={styles.text_input}
          placeholderTextColor="#FF0000"
          onChangeText={text => setContent(text)}
        />
      </View>
      <View style={{flexDirection:'row'}}>
      
        <View style={styles.button_image}>
          <Button
            onPress={hanldeChooseImage}
            title="Chọn ảnh"
            color="#841584"

          />
         
        </View>
        {image ? renderAsset(image) : null}

      </View>

      <View style={styles.button}>
        <Button title="Gửi"
          onPress={checkTextInput}
        />
      </View>

      {/* <View>
        <Button onPress={showDatepicker} title="Show date picker!" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )} */}
    </View>
  )


}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',

  },
  button_image: {
    flexDirection:'column',
    marginTop:10,
    marginLeft:10
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
  button: {
    // marginLeft:10,
    // marginRight:10
  }
});