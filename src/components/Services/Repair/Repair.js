import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, TextInput, View, Button, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CalDate from '../Bill/CalDate'
import { Text_Size, URL } from '../../../globals/constants'
import { ScreenKey } from '../../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')
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
  const [imagePublic, setImagePublic] = useState();
  const { imageBase64, uri, width, height, mime } = props.route.params;


  const getData = async () => {

    try {

      const _token = await AsyncStorage.getItem('token');
      const _apartId = await AsyncStorage.getItem('apartId');
      const _userId = await AsyncStorage.getItem('infoUser');


      if (_token !== null && _apartId !== null && _userId !== null) {

        const _tokenObject = JSON.parse(_token);
        const _apartIdObject = JSON.parse(_apartId);
        const _userIdObject = JSON.parse(_userId);
        // console.log(userId+" "+token+" "+apartId);
        setUserId(_userIdObject._id);
        setToken(_tokenObject);
        setApartId(_apartIdObject);
        setFlag2(false);

      }

    } catch (e) {
      // error reading value
    }
  }
  const sendImage = async () => {
    if (imageBase64 !== '') {
      const res = await fetch(URL + 'api/upload-image/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: imageBase64
        }),
      })
     
      if (res.status === 200) {
        const result = await res.json();
        const res1 = await fetch(URL + 'api/repair/add', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + `${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: topic,
            content: content,
            author: userId,
            image: result.data

          }),
        })
     
        if (res1.status === 200) {
          Alert.alert('Thông báo', 'Báo cáo thành công',
            [

              { text: "OK" }
            ]);
        }

      }
    }
    else {
      const res1 = await fetch(URL + 'api/repair/add', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: topic,
          content: content,
          author: userId,
          image: ''

        }),
      })
    
      if (res1.status === 200) {
        
        Alert.alert('Thông báo', 'Báo cáo thành công',
          [
            { text: "OK" }
          ]);
      }
    }
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let date = CalDate(currentDate);
    let string_date = date.dd + '/' + date.mm + '/' + date.yyyy



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

  const checkTextInput = async () => {

    //Check for the Name TextInput
    if (!topic.trim()) {
      Alert.alert('Thông báo', 'Chủ đề không được trống');
      return;
    }
    //Check for the Email TextInput
    if (!content.trim()) {
      Alert.alert('Thông báo', 'Nội dung không được trống');
      return;
    }
    else {
      await sendImage();
    }



  };
  useEffect(() => {

    getData();
    setFlag(false);
    setImage({
      uri: uri,
      width: width,
      height: height,
      mime: mime,

    })

  }, [flag, flag2, props.route.params?.imageBase64])
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
    <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/background.jpg')}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text2}>Chủ đề</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon name={'phone-portrait-outline'} size={28} color={'rgba(255,255,255,0.7)'}
            style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input2}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            onChangeText={(text) => setTopic(text)}
            multiline
          />
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.text2}>Nội dung</Text>
        </View>
        <View style={styles.inputContainer}>
          {/* <Icon name={'phone-portrait-outline'} size={28} color={'rgba(255,255,255,0.7)'}
            style={styles.inputIcon} /> */}
          <TextInput
            style={styles.input2}
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            underlineColorAndroid='transparent'
            multiline
            onChangeText={(text) => setContent(text)}
          />
        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>

        <View style={styles.button_image}>
          <Button
            onPress={hanldeChooseImage}
            title="Chọn ảnh"
            color="#841584"

          />

        </View>
        {image ? renderAsset(image) : null}

      </View>

      <TouchableOpacity onPress={checkTextInput} style={styles.appButtonContainer}>
        <View style={styles.myButtonLogOut}>

          <Text style={styles.appButtonText}>Gửi</Text>

        </View>
      </TouchableOpacity>

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
    </ImageBackground>
  )


}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 10,

  },
  button_image: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft: 10,

    // justifyContent:'center'

  },
  text: {
    color: 'rgba(206, 0, 255, 1)',
    fontSize: 20,

    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 25,

  },
  text2: {
    color: 'rgba(72, 100, 106, 1)',
    fontSize: 20,

    fontWeight: 'bold',
    marginTop: 10,
    marginHorizontal: 25,

  },
  inputContainer: {
    marginTop: 10
  },
  input: {
    width: WIDTH - 55,
    // height: 45,
    borderRadius: 10,
    fontSize: 20,

    backgroundColor: ' rgba(255, 255, 255, 0.3)',
    color: 'rgba(206, 0, 255, 1)',
    marginHorizontal: 25
  },
  input2: {
    width: WIDTH - 55,
    // height: 45,
    borderRadius: 10,
    fontSize: 16,

    backgroundColor: ' rgba(255, 255, 255, 0.3)',
    color: 'rgba(72, 100, 106, 1)',
    marginHorizontal: 25
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12, marginTop: 10,

  },





  appButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",

  },

});