import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Text_Size, URL } from '../../../globals/constants'
import MonthPicker from 'react-native-month-year-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
var numeral = require('numeral');
import CalDate from './CalDate'
export default function SumBill({ route }) {
    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const [other, setOther] = useState(0);
    const [sumPrice, setSumPrice] = useState(0);
    const [flag,setFlag]=useState(true);
    const [spinner, setSpinner] = useState(false);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const { monthYear, apartId, token } = route.params;
    const showPicker = useCallback((value) => setShow(value), []);
    let tempSum=0;
    const onValueChange = useCallback(
        (event, newDate) => {
            const selectedDate = newDate || date;

            showPicker(false);
            setDate(selectedDate);
            let mydate = CalDate(selectedDate);
            if (mydate.mm === monthYear.mm && mydate.yyyy === monthYear.yyyy) {


            }
            else {
                setMonth(mydate.mm);
                setYear(mydate.yyyy);
            }
           

        },
        [date, showPicker],
    );
    const getdata = async () => {
        /*get electric bill*/
        const res_elec = await fetch(URL + `api/elec-bill/month-bill/${apartId}/${month}/${year}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        const result_elect = await res_elec.json();
        if (res_elec.status === 200) {
            tempSum=tempSum+result_elect.data.total_money;
            var _sumPrice_elec = numeral(result_elect.data.total_money.toString()).format('0,0');
            setElectric(_sumPrice_elec);
          

        }
        /* get water bill */
        const res_water = await fetch(URL + `api/water-bill/month-bill/${apartId}/${month}/${year}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        const result_water = await res_water.json();
        if (res_water.status === 200) {
            tempSum=tempSum+result_water.data.total_money;
            var _sumPrice_water = numeral(result_water.data.total_money.toString()).format('0,0');
            setWater(_sumPrice_water)
           

        }/* get other bill */

        const res_other = await fetch(URL+`api/other-bill/month-bill/${apartId}/${month}/${year}`, {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + `${token}`,
              'Content-Type': 'application/json',
            },
          })
          const result_other = await res_other.json();
        
          if(res_other.status===200)
          {

             let _sumPrice_other= result_other.data.apart_management+result_other.data.parking_fees+result_other.data.maintenance_fee
             +result_other.data.service_charge+result_other.data.other_fees;
             tempSum=tempSum+_sumPrice_other;
             let _sumPriceFormat=numeral(_sumPrice_other.toString()).format('0,0');
            
             setOther(_sumPriceFormat);
          }

          setSumPrice(numeral(tempSum.toString()).format('0,0'));
          setSpinner(false);


    }
    useEffect(() => {
        let monthtoday, yeartoday;

        let preMonth = (monthYear.mm - 1).toString();
        if (preMonth.length < 2)
            preMonth = '0' + preMonth;
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
        setSpinner(true);
        setFlag(false);
        getdata();
       

    }, [flag]);
    const handleClick = () => {
        setSpinner(true);
        getdata();
        setSpinner(false);
    }

    return (
        <View>
             <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container}>
                <TouchableOpacity onPress={() => showPicker(true)}>
                    <Text style={styles.text}>Tháng {month}, năm {year}</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={handleClick}>
                    <Icon name='search1'
                        type='antdesign'
                        color='#f1c40f'
                        size={25}
                    />
                </TouchableOpacity>
                {show && (
                    <MonthPicker
                        onChange={onValueChange}
                        value={date}
                        minimumDate={new Date(2019, 0)}
                        maximumDate={new Date()}

                    />
                )}
            </View>
            <View style={styles.container}>
                <Text style={styles.text_title}>Danh mục</Text>
                <Text style={styles.text_title}>Thông số</Text>
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
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        color: 'black',
        fontSize: Text_Size.Text
    },
    text_title: {
        color: 'black',
        fontSize: Text_Size.Text_title,
        color: '#3498db'
    },
    text_sum: {
        color: 'black',
        fontSize: Text_Size.Text_sum,
        color: '#e67e22'
    }
});