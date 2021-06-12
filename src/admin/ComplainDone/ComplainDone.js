
import React, { Component, useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemComplainDone from './ItemComplainDone'
import MonthPicker from 'react-native-month-year-picker';
import { Icon } from 'react-native-elements';

import { URL, token } from '../globals/constants'
import CalDate from '../Bill/SumBill/Detail/CalDate'
import Spinner from 'react-native-loading-spinner-overlay';
var numeral = require('numeral');
const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  )
}
const dateCurrent = '2021-08-12'
export default function App(props) {
  const [filterData, setFilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [flag, setFlag] = useState(true);
  const showPicker = useCallback((value) => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      let mydate = CalDate(selectedDate);
      var today = new Date(dateCurrent);
      let monthYear = CalDate(today);
      if (mydate.mm === monthYear.mm && mydate.yyyy === monthYear.yyyy) {
      }
      else {

        setMonth(mydate.mm);
        setYear(mydate.yyyy);
      }



    },
    [date, showPicker],
  );
  const handleClick = () => {
    setSpinner(true);
    fetchData();
  }
  const ItemView = (item) => {
    return (
      <ItemComplainDone item={item.item} navigation={props.navigation} token={token}/>
    )
  }


  const fetchData = async () => {
    const res = await fetch(URL + `api/all-bill/all-resolved/${month}/${year}`, {
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

    }
  }
  const element = (filterData.length === 0) ? <View style={styles.emptyContainer}><Text style={styles.textEmpty}>Không có dữ liệu</Text></View> :
    <FlatList
      data={filterData}
      keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={(item) => ItemView(item)}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={10}

    />
  useEffect(() => {
    var today = new Date(dateCurrent);
    let monthYear = CalDate(today);
    let monthtoday, yeartoday;

    let preMonth = (monthYear.mm - 1).toString();
    if (preMonth.length < 2) {
      preMonth = '0' + preMonth;
    }

    if (preMonth != 0) {
      monthtoday = preMonth;
      yeartoday = monthYear.yyyy;
    }
    else {
      monthtoday = 12
      yeartoday = monthYear.yyyy - 1;
    }

    setMonth(monthtoday);
    setYear(yeartoday);
    setFlag(false);

    fetchData();
    setSpinner(true);
    const unsubscribe = props.navigation.addListener('focus', () => {
      setSpinner(true);
      fetchData();
    });

    return unsubscribe;

  }, [flag])



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles.chooseDate}>
        <TouchableOpacity onPress={() => showPicker(true)}>
          <Text style={styles.text}>Tháng {month}, năm {year}</Text>
        </TouchableOpacity>
        {show && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date(2019, 0)}
            maximumDate={new Date()}

          />
        )}
        <TouchableOpacity onPress={handleClick} style={{ marginTop: 10 }}>
          <Icon name='search1'
            type='antdesign'
            color='#f1c40f'
            size={25}
          />
        </TouchableOpacity>
      </View>
     

        {element}
    
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
    flex: 1

  }, chooseDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  },
  text: {
    fontSize: 20
  },
  emptyContainer: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50%', 
  },
  textEmpty: {
    fontSize: 20
  },
})