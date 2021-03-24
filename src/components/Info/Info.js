import React, { useEffect, useState } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL, Text_Size } from '../../globals/constants'
import { ScreenKey } from '../../globals/constants'
export default function Info(props) {
    const [name, setName] = useState('nguyen van a');
    const [email, setEmail] = useState('abc@gmail.com');
    const [phone, setPhone] = useState('0909099900');
    const [nativePlace, setNativePlace] = useState('quan 5 tphcm');
    const [address, setAddress] = useState('toa c lo B ');
    const [apartId, setApartId] = useState();
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [identify_card, setIndetify_card] = useState();
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const getInfoApart = async () => {


        const res = await fetch(URL + `api/apart/${apartId}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },

        })
        const result = await res.json();
        console.log(result);
        setAddress("toà " + result.data.block + " số nhà " + result.data.name);
    }

    const getData = async () => {
        try {
            const infoUser = await AsyncStorage.getItem('infoUser');
            const token = await AsyncStorage.getItem('token');
            const apartId = await AsyncStorage.getItem('apartId');
            if (infoUser != null && token != null) {
                const _infoUser = JSON.parse(infoUser);
                const _token = JSON.parse(token);
                const _apartId = JSON.parse(apartId);
                await setApartId(_apartId);
                await setToken(_token);
                console.log(_infoUser);
                setName(_infoUser.name);
                setEmail(_infoUser.email);
                setPhone(_infoUser.phone);
                setNativePlace(_infoUser.native_place);
                setUserId(_infoUser.id);
                setIndetify_card(_infoUser.identify_card);
                setFlag(false);


            }

        } catch (e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData();
        getInfoApart();
        setFlag2(false);

        const unsubscribe = props.navigation.addListener('focus', () => {
            getData();
            getInfoApart();
            setFlag2(false);
        });

        return unsubscribe;




    }, [flag, flag2, props.navigation])
    // const deleteAsync = async () => {
    //     try {

    //         AsyncStorage.clear();

    //     } catch (e) {
    //         // error reading value
    //     }
    // }
    const deleteAsync = () => {
        props.navigation.navigate(ScreenKey.SignIn);
    }
    const handleUpdateInfo = () => {
        props.navigation.navigate(ScreenKey.ChangeInfo, {
            user_id: userId,
            name: name,
            email: email,
            phone: phone,
            identify_card: identify_card,
            native_place: nativePlace,
            token: token
        });
    }

    return (
        <View>
            <View style={styles._title}>
                <Text style={styles._text_title}>Thông tin cá nhân</Text>
            </View>

            <View style={styles.container}>
                <View style={styles._row}>
                    <Icon name='user'
                        type='feather'
                        color='#f1c40f'
                        size={30}
                    />

                    <Text style={styles.text} >Họ tên</Text>
                </View>

                <Text style={styles.text_info}>{name}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles._row}>
                    <Icon name='email'
                        type='fontisto'
                        color='#e74c3c'
                        size={30}
                    />
                    <Text style={styles.text}>Email</Text>
                </View>

                <Text style={styles.text_info}>{email}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles._row}>
                    <Icon name='phone-call'
                        type='feather'
                        color='#3498db'
                        size={30}
                    />
                    <Text style={styles.text}>Điện thoại</Text>
                </View>

                <Text style={styles.text_info}>{phone}</Text>
            </View>
            <View style={styles.container}>
                <View style={styles._row}>
                    <Icon name='island'
                        type='fontisto'
                        color='#2ecc71'
                        size={30}
                    />
                    <Text style={styles.text}>Quê Quán</Text>
                </View>

                <Text style={styles.text_info}>{nativePlace}</Text>
            </View>

            <View style={styles.container}>
                <View style={styles._row}>
                    <Icon name='building-o'
                        type='font-awesome'
                        color='#1abc9c'
                        size={30}
                    />
                    <Text style={styles.text}>Địa chỉ</Text>
                </View>

                <Text style={styles.text_info}>{address}</Text>
            </View>
            <View style={styles.myButtonContainer}>
                <View style={styles.rowButton}>
                    <TouchableOpacity onPress={() => console.log("swicth")} style={styles.appButtonContainer}>
                        <View style={styles.myButton}>

                            <Text style={styles.appButtonText}>Thay đổi căn hộ</Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleUpdateInfo} style={styles.appButtonContainer}>
                        <View style={styles.myButton}>

                            <Text style={styles.appButtonText}>Cập nhật thông tin</Text>

                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={deleteAsync} style={styles.appButtonContainerLogOut}>
                    <View style={styles.myButtonLogOut}>

                        <Text style={styles.appButtonText}>Đăng xuất</Text>

                    </View>
                </TouchableOpacity>


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
    _row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: Text_Size.Text,
        color: 'black',
        marginLeft: 10

    },
    text_info: {
        fontSize: Text_Size.Text,
        color: 'black',
        marginTop: 5,

    },
    _title: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'center',
        padding: 25,
        backgroundColor: "#00a8ff",
        paddingVertical: 10,
        paddingHorizontal: 12,
        elevation: 8,
    },
    _text_title: {
        fontSize: 25,

        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'capitalize',
    },
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        // backgroundColor:'red'
    },
    myButton: {
        alignItems: 'center',
        // marginTop:10,

    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    myText: {
        fontSize: Text_Size.Text,

    },
    rowButton: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10
    },





    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    appButtonContainerLogOut: {
        elevation: 8,
        backgroundColor: "#e74c3c",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },

});