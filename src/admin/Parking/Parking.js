
import React, { Component, useEffect, useState, useCallback, useContext } from 'react';


import { Text, StyleSheet, View, TextInput, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ItemParking from './ItemParking'
import Spinner from 'react-native-loading-spinner-overlay';
import { URL, TokenContext } from '../globals/constants'
const ItemSeparatorView = () => {
    return (
        <View style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }} />
    )
}

export default function Parking(props) {
    const token = useContext(TokenContext).token;
    const [filterData, setFilterData] = useState([]);
    const [spinner, setSpinner] = useState(false);
    
    const ItemView = (item) => {
        return (
            <ItemParking item={item.item} navigation={props.navigation} token={token}/>
        )
    }
    const getdata = async () => {
        const res = await fetch(URL+`api/noti-parking/allreport`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        console.log(res.status);
        if (res.status===200){
            const result =await res.json();
            setFilterData(result.data);
        }
    }
   
    useEffect(() => {
        getdata();
    }, [])
    const element = (filterData.length === 0) ? <View style={styles.emptyContainer}><Text style={styles.textEmpty}>Không có khiếu nại</Text></View> :
    <FlatList
    data={filterData}
    keyExtractor={(item, index) => index.toString()}
    ItemSeparatorComponent={ItemSeparatorView}
    renderItem={(item) => ItemView(item)}
/>
    return (
        <View style={{ flex:1 }} >
            <Spinner
                visible={spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
             <View style={styles._title}>
                <Text style={styles._text_title} >{'Bãi xe'}</Text>

            </View>
           
              {element}
           
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
        flex: 1

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
    emptyContainer: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '50%', 
      },
      textEmpty: {
        fontSize: 20
      },
})