import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity ,ScrollView} from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
import { Dimensions } from 'react-native';
const window = Dimensions.get('window');
export default function Apartment(props) {
  
    const [types3, settypes3] = useState([{ label: 'param1', value: 0 }, { label: 'param2', value: 1 }, { label: 'param3', value: 2 },]);
    const [value3, setvalue3] = useState(0);
    const [value3Index, setvalue3Index] = useState(0);
    const getInfoApart = async () => {

        const res = await fetch(URL + `api/apart/all-aparts/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })
        const result = await res.json();
        if (res.status === 200) {
            let temp_apart = [];
            for (let t of result.data) {
                const temp = {
                    label: "toa: " + t.block + " " + " nha: " + t.name,
                    value: t._id
                }
                temp_apart.push(temp);

            }
            setApartId(temp_apart[0].value);
            setApart(temp_apart);
        }

    }

    // useEffect(() => {
    //     // getInfoApart();

    // }, [token])

    const storeData = async (apartId) => {
        try {
            const jsonApartId = JSON.stringify(apartId);
            await AsyncStorage.setItem('apartId', jsonApartId);
        } catch (e) {
            // saving error
        }
    }
    const handleClick = () => {

        storeData(apartId);
        props.navigation.navigate(ScreenKey.Home);
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.welcome}>React Native Simple Radio Button Demo</Text>
                <Text style={styles.welcome}>1. Basic</Text>

              

               


                <Text style={styles.welcome}>2. Advanced</Text>
              
                <Text style={styles.welcome}>3. Pro</Text>
                <View style={styles.component}>
                    <RadioForm formHorizontal={false} animation={true}  >
                        {types3.map((obj, i) => {
                            var onPress = (value, index) => {
                                console.log("value ",value);
                                setvalue3(value);
                                setvalue3Index(index);
                                
                            }
                            return (
                                <RadioButton labelHorizontal={true} key={i} >
                                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                    <RadioButtonInput
                                        obj={obj}
                                        index={i}
                                        isSelected={value3Index === i}
                                        onPress={onPress}
                                        buttonInnerColor={'#f39c12'}
                                        buttonOuterColor={value3Index === i ? '#2196f3' : '#000'}
                                        buttonSize={20}
                                        buttonStyle={{}}
                                        buttonWrapStyle={{ marginLeft: 10 }}
                                    />
                                    <RadioButtonLabel
                                        obj={obj}
                                        index={i}
                                        onPress={onPress}
                                        labelStyle={{ fontWeight: 'bold', color: '#2ecc71',fontSize:20 }}
                                        labelWrapStyle={{}}
                                    />
                                </RadioButton>
                            )
                        })}
                    </RadioForm>
                    <Text>selected: {types3[value3Index].label}</Text>
                </View>

            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    component: {
        alignItems: 'center',
        marginBottom: 50,
    },
    radioStyle: {
        borderRightWidth: 1,
        borderColor: '#2196f3',
        paddingRight: 10
    },
    radioButtonWrap: {
        marginRight: 5
    },
});