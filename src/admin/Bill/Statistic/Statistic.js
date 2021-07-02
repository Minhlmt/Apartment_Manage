import React, { Component, useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import MonthPicker from 'react-native-month-year-picker';
import { Icon } from 'react-native-elements';
import CalDate from '../../Bill/SumBill/Detail/CalDate'
import { URL, token, ScreenKey } from '../../globals/constants'
import Spinner from 'react-native-loading-spinner-overlay';
import { Button } from 'react-native';

var numeral = require('numeral');
const dateCurrent = '2021-08-12'
export default function Statistic(props) {
  const [tableHead, setTableHead] = useState(['', 'Cần thu', 'Hiện tại', 'Thiếu']);
  const [tableTitle, setTabTitle] = useState(['Tổng tiền', 'Điện', 'Nước', 'Khác']);
  const [tableData, setTableData] = useState([
    ['1,000,000,000', '1,000,000,000', '1,000,000,000'],
    ['1,000,000,000', '1,000,000,000', '1,000,000,000'],
    ['1,000,000,000', '1,000,000,000', '1,000,000,000'],
    ['1,000,000,000', '1,000,000,000', '1,000,000,000']
  ])
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const showPicker = useCallback((value) => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      showPicker(false);
      setDate(selectedDate);
      let mydate = CalDate(selectedDate);
      var today = new Date();
      let monthYear = CalDate(today);
      if (mydate.mm === monthYear.mm && mydate.yyyy === monthYear.yyyy) {
      }
      else {
        console.log("Ok");
        setMonth(mydate.mm);
        setYear(mydate.yyyy);
      }
    },
    [date, showPicker],
  );
  const fetchData = async () => {
    const res = await fetch(URL + `api/all-bill/statistics/${month}/${year}`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (res.status === 200) {
      const result = await res.json();
      console.log("RESULT ", result);
      const total_total_int = result.total.total;
      const elect_total_int = result.total.electric;
      const water_total_int = result.total.water;
      const other_total_int = result.total.other;
      const total_total = numeral(total_total_int.toString()).format('0,0')
      const elect_total = numeral(elect_total_int.toString()).format('0,0')
      const water_total = numeral(water_total_int.toString()).format('0,0')
      const other_total = numeral(other_total_int.toString()).format('0,0')

      const unpaid_total_int = result.unpaid.total
      const elect_unpaid_int = result.unpaid.electric
      const water_unpaid_int = result.unpaid.water
      const other_unpaid_int = result.unpaid.other
      const unpaid_total = numeral(unpaid_total_int.toString()).format('0,0');
      const elect_unpaid = numeral(elect_unpaid_int.toString()).format('0,0');
      const water_unpaid = numeral(water_unpaid_int.toString()).format('0,0');
      const other_unpaid = numeral(other_unpaid_int.toString()).format('0,0');



      const paid_total = numeral((total_total_int - unpaid_total_int).toString()).format('0,0');
      const elect_paid = numeral((elect_total_int - elect_unpaid_int).toString()).format('0,0');
      const water_paid = numeral((water_total_int - water_unpaid_int).toString()).format('0,0');
      const other_paid = numeral((other_total_int - other_unpaid_int).toString()).format('0,0');

      const row1 = [];
      row1.push(total_total); row1.push(paid_total); row1.push(unpaid_total);
      const row2 = [];
      row2.push(elect_total); row2.push(elect_paid); row2.push(elect_unpaid);
      const row3 = [];
      row3.push(water_total); row3.push(water_paid); row3.push(water_unpaid);
      const row4 = [];
      row4.push(other_total); row4.push(other_paid); row4.push(other_unpaid);
      const table = [];
      table.push(row1); table.push(row2); table.push(row3); table.push(row4);
      setTableData(table);
    }
    setSpinner(false);

  }

  const handleClick = () => {
    setSpinner(true);
    fetchData();
  }
  const onChangeBill = () => {
    props.navigation.navigate(ScreenKey.SumBill, {
      filterRadio: 2
    })
  }
  useEffect(() => {
    setSpinner(true);
    var today = new Date();
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

  }, [flag])

  return (
    <View style={styles.container}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={styles._title}>
        <Text style={styles._text_title} >{`Thống kê`}</Text>

      </View>
      <View style={{flexDirection:'column', borderBottomWidth:1,marginBottom:10}}>
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
      </View>
      <Table borderStyle={{marginTop:10, borderWidth: 0.5 }}>
        <Row data={tableHead} flexArr={[1, 2, 2, 2]} style={styles.head} textStyle={styles.text_table} />
        <TableWrapper style={styles.wrapper}>
          <Col data={tableTitle} style={styles.title} heightArr={[50, 50]} textStyle={styles.text_table} />
          <Rows data={tableData} flexArr={[2, 2, 2]} style={styles.row} textStyle={styles.text_table} />
        </TableWrapper>
      </Table>
      <View style={styles.btnDetail}>
        <Button
          onPress={onChangeBill}
          title="Chưa đóng tiền"
          color="#841584"
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 1, paddingTop: 0, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: { height: 50 },
  text_table: { textAlign: 'center' },
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
  chooseDate: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  }, text: {
    fontSize: 20
  },
  btnDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  }
});