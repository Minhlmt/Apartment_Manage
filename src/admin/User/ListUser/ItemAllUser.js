import React, { useState, useEffect } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import {URL,token,ScreenKey} from './../../globals/constants'
var numeral = require('numeral');
function ItemUser(props) {
    const [apartName, setApartName] = useState();
    const [license_plates, setLicensePlates] = useState();
    useEffect(() => {
        let temp = "";
        for (let t of props.item.apart_name) {
            temp = temp + t + " ";
        }
        let temp2 = "";
        for (let t2 of props.item.license_plates) {
            temp2 = temp2 + t2 + " ";
        }

        setApartName(temp);
        setLicensePlates(temp2)
    }, [props.item.apart_name, props.item.license_plates])
    const handleClick = () => {
        console.log(apartName);
        props.navigation.navigate(ScreenKey.DetailUser, {
            item:props.item,
            name:props.item.name,
            apartName,
            license_plates

        })
    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container1} onPress={handleClick}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{props.item.name} </Text>
                    <Text style={styles.sumPrice}>{apartName} </Text>

                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-end'}}>
                    <View style={{ flexDirection: 'row', justifyContent:'flex-end' }}>
                        <Text style={styles.status_done}>{props.item.phone}</Text>

                        <Icon name='arrow-forward-ios'
                            type='material'
                            color='#3498db'
                            size={20}
                        />
                    </View>
                    <Text style={styles.sumPrice}>{license_plates} </Text>
                </View>


            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop: 10,
        padding: 8,
        paddingVertical: 14,
        paddingHorizontal: 15,
        elevation: 3,
        justifyContent: 'space-between'


    },
    text: {
        flex: 1,
        color: 'rgba(3, 0, 0, 0.7)',
        marginBottom: 5,
        fontSize: 20
    },
    status_done: {
        color: 'blue'
    },
    status_false: {
        color: 'red'
    },
    sumPrice: {
        color: '#800000'
    }
});
export default React.memo(ItemUser);