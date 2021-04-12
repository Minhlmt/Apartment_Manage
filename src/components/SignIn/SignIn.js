import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {URL} from '../../globals/constants'
import {ScreenKey} from '../../globals/constants'
export default function App(props) {
  const [username, setUsername] = useState();
  const [pass, setPass] = useState();
  const [success, setSuccess] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const senddata = async () => {
    const res = await fetch(URL+'api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: pass
      }),
    })
    const result = await res.json();
    if (res.status === 200) {
      setSpinner(false);
      storeData(result.token,result.infoUser);
      console.log('USERID ',result.infoUser._id)
      props.navigation.navigate(ScreenKey.ChooseApart,{token:result.token,userId:result.infoUser._id});
    } else {
      setSpinner(false);
      Alert.alert("Login", 'username or password invalid');
    }

  }
  const storeData = async (token,infoUser) => {
    try {
      const jsonToken = JSON.stringify(token);
      const jsonInfoUser = JSON.stringify(infoUser);
      await AsyncStorage.setItem('token', jsonToken);
      await AsyncStorage.setItem('infoUser', jsonInfoUser);
    } catch (e) {
      // saving error
    }
  }



  function handleLogin() {
    setSpinner(true);
    senddata();
  }
  return (

    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Text style={styles.logo}>Login</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setUsername(text)} />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setPass(text)} />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity>


    </View>
  );
}



const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});