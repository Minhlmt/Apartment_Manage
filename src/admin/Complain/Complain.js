
import React, { Component, useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Spinner from 'react-native-loading-spinner-overlay';
import {URL,token} from '../globals/constants'
import ItemComplain from './ItemComplain';
const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  )
}

export default function App(props) {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [spinner,setSpinner]=useState(false);
  const ItemView = (item) => {
    return (
      <ItemComplain item={item.item} navigation={props.navigation} />
    )
  }


  const fetchData = async () => {
    const res = await fetch(URL+`api/all-bill/all-report`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    // setSpinner(false);
  
    if (res.status === 200) {
      const result = await res.json();
      setFilterData(result.data);
      setmasterData(result.data);

    }
  }
  useEffect(() => {
    fetchData();
    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchData();
  });

  return unsubscribe;

   

  }, [props.navigation])

  const searchFilter = (text) => {

    if (text ) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ?
          item.name.toUpperCase()
          : ''.toUpperCase();
          const textData = text.toUpperCase();
        return (itemData.indexOf(textData) > -1);
      });
      setFilterData(newData);
      setSearch(text);
    }
    else {
      setFilterData(masterData);
      setSearch(text);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles._title}>
        <Text style={styles._text_title} >{`Khiếu nại`}</Text>

      </View>

      <View style={styles.container}>
        {/* <View style={{ flexDirection: 'row' }}>
          <TextInput style={styles.textInput}
            value={search}
            placeholder='search here'
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          />
        </View> */}
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={(item) => ItemView(item)}

        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  itemStyle: {
    padding: 10
  }, textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: 'white',
    flex:1
   
  }, chooseDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  },
  _title: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    padding: 25,
    backgroundColor: "#00a8ff",
    paddingVertical: 20,
    paddingHorizontal: 12,
    elevation: 8,
  },
  _text_title: {
    fontSize: 20,

    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: 'capitalize',
  },
})