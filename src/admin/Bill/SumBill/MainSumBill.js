
import React, { Component, useEffect, useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';

import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemBill from './ItemBill'
import MonthPicker from 'react-native-month-year-picker';
import { Icon } from 'react-native-elements';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { URL, token } from '../../globals/constants'
import CalDate from './Detail/CalDate'
import Spinner from 'react-native-loading-spinner-overlay';
var numeral = require('numeral');
const ItemSeparatorView = () => {
  return (
    <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
  )
}
const dateCurrent = '2021-08-12'
export default function App(props) {
  const {filterRadio}=props.route.params;
  const [filterData, setFilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [types3, settypes3] = useState([{ label: 'Tất cả', value: 0 }, { label: 'Đã thanh toán', value: 1 }, { label: 'Chưa thanh toán', value: 2 },]);
  const [value3, setvalue3] = useState(0);
  const [value3Index, setvalue3Index] = useState(filterRadio);
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
    let sumPrice = numeral(item.item.total_money.toString()).format('0,0');
    return (
      // <Text style={styles.itemStyle}>
      //   {item.item.id}{'. '}{item.item.title.toUpperCase()}
      // </Text>
      // <ItemBill navigation={props.navigation} title={item.item.apart_name} sumPrice={sumPrice} status={item.item.is_pay} billId={item.item.id}
      // apartId={item.item.apart_id} month={item.item.month} year={item.item.year} electric_bill={item.item.electric_bill} />
      <ItemBill item={item.item} navigation={props.navigation} />
    )
  }


  const fetchData = async () => {
   
    const res = await fetch(URL + `api/all-bill/all/${month}/${year}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })


    if (res.status === 200) {
      const result = await res.json();

      setFilterData(result.data);
      setmasterData(result.data);
      searchFilter('', filterRadio,result.data);
      
    

    }
   
    setSpinner(false);
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
    setSpinner(true);
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
    const unsubscribe = props.navigation.addListener('focus', () => {
      setSpinner(true);
      fetchData();
    });

    return unsubscribe;

  }, [flag,props.navigation])

  const searchFilter = (text, index,data) => {
   
    if (text && index === 0) {
      const newData = data.filter((item) => {
        const itemData = item.apart_name ?
          item.apart_name.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        return (itemData.indexOf(textData) > -1);
      });
      setFilterData(newData);
      setSearch(text);
    }
    else if (text && index === 1) {
      const newData = data.filter((item) => {
        const itemData = item.apart_name ?
          item.apart_name.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        return ((itemData.indexOf(textData) > -1) && item.is_pay);
      });
      setFilterData(newData);
      setSearch(text);
    }
    else if (text && index === 2) {
      const newData = data.filter((item) => {
        const itemData = item.apart_name ?
          item.apart_name.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase();
        return ((itemData.indexOf(textData) > -1) && !item.is_pay);
      });
      setFilterData(newData);
      setSearch(text);
    }
    else if (index === 1) {
      const newData = data.filter((item) => {

        return (item.is_pay);
      });
      setFilterData(newData);
      setSearch(text);

    }
    else if (index === 2) {
      const newData = data.filter((item) => {

        return (!item.is_pay);
      });
      console.log("newData ",newData)
      setFilterData(newData);
      setSearch(text);
    }

    else {
      setFilterData(data);
      setSearch(text);
    }
  }

  return (
    <View style={{ height: '85%' }}>
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

      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TextInput style={styles.textInput}
            value={search}
            placeholder='search here'
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text, value3Index,masterData)}
          />
          {/* <TouchableOpacity onPress={handleClick} style={{ flex: 1, marginTop: 10 }}>
            <Icon name='search1'
              type='antdesign'
              color='#f1c40f'
              size={25}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.component}>
          <RadioForm formHorizontal={true} animation={true}  >
            {types3.map((obj, i) => {
              var onPress = (value, index) => {

                // setApartId(value);
                // setvalue3(value);
               
                setvalue3Index(index);
                searchFilter('', index,masterData);
              }
              return (
                <RadioButton labelHorizontal={true} key={i} >
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={value3Index === i}
                    onPress={onPress}
                    buttonInnerColor={'rgba(0, 0, 255, 0.7)'}
                    buttonOuterColor={value3Index === i ? '#2196f3' : '#000'}
                    buttonSize={15}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    onPress={onPress}
                    labelStyle={{ fontWeight: 'bold', color: '#2ecc71' }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              )
            })}
          </RadioForm>
        </View>
      </View>
      {element}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white'
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
    flex: 1,
    color:'black'

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