
import React, { Component, useEffect, useState, useCallback, useContext } from 'react';
import { SafeAreaView } from 'react-native';

import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemAllUser from './ItemAllUser'
import Spinner from 'react-native-loading-spinner-overlay';
import {URL,token,TokenContext} from './../../globals/constants'
const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  )
}

export default function App(props) {
  const token=useContext(TokenContext).token;
  const {searchText}=props.route.params;
  const [filterData, setFilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [spinner,setSpinner]=useState(false);
  const ItemView = (item) => {
    return (
      <ItemAllUser item={item.item} navigation={props.navigation} />
    )
  }
  const fetchData = async () => {
    const res = await fetch(`https://qlccadmin-api.herokuapp.com/api/user/all`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    setSpinner(false);
   
    if (res.status === 200) {
      const result = await res.json();

      setFilterData(result.data);
      setmasterData(result.data);
      searchFilter(result.data,searchText);


    }
  }
  useEffect(() => {
    setSpinner(true);
    fetchData();
    setSearch(searchText);
  
  }, [])

  const searchFilter = (_masterData,text) => {
    if (text ) {
      const newData = _masterData.filter((item) => {
        const itemData = item.name ?
          item.name.toUpperCase()
          : ''.toUpperCase();
          const textData = text.toUpperCase();
        for (let t of item.license_plates){
         if (t.indexOf(textData)>-1)
          return true;
        }
       
        return (itemData.indexOf(textData) > -1);
      });
      setFilterData(newData);
      setSearch(text);
    }
    else {
      setFilterData(_masterData);
      setSearch(text);
    }
  }

  return (
    <View style={{height:'90%'}} >
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput style={styles.textInput}
            value={search}
            placeholder='search here'
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(masterData,text)}
          />
        </View>
        

        
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={(item) => ItemView(item)}
          // initialNumToRender={5}
          // maxToRenderPerBatch={10}
          // windowSize={10}

        />
        </View>
     
    </View>
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
    flex:1,color:'black'
   
  }, chooseDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  }
})