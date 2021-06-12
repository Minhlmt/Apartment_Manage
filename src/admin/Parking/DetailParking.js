import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, Dimensions,TextInput } from 'react-native';
import { Cloudinary } from '@cloudinary/base';

import { URL, TokenContext, ScreenKey } from '../globals/constants'
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements'
import ImageZoom from 'react-native-image-pan-zoom';
const { width: WIDTH } = Dimensions.get('window')
export default function NotifyDetailRepair(props) {
    const token = useContext(TokenContext).token;
    const [_image, setImage] = useState('');
    const [spinner, setSpinner] = useState(false);
    const [statusImage, setStatusImage] = useState(true);
    const [btnConfirm, setBtnConfirm] = useState(true);
    const [tokenDevices, setTokenDevices] = useState();
    const [license_plate,setLicense_plate]=useState();
    const { title, content, image, _id, author, is_confirm } = props.route.params.item;
    const { create_date, name } = props.route.params;
    const fetchData = async () => {
        const res_1 = await fetch(URL + `api/uploadv2/image-url?key=${image}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        setSpinner(false);
        if (res_1.status === 200) {
            const result_1 = await res_1.json();
            console.log("URL ", result_1.imageUrl);
            setImage(result_1.imageUrl);
        }
    }
    const getTokenDevice = async () => {
        const res = await fetch(URL + `api/user/${author}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        if (res.status === 200) {
            const result = await res.json();
            
            setTokenDevices(result.data.token_device)
        }
    }
    useEffect(() => {
        if (image === '') {
            setStatusImage(false);
        }
        else {
            fetchData();
        }
        setSpinner(true);
        if (is_confirm === true) {
            setBtnConfirm(false);
        }
        else {
            setBtnConfirm(true)
        }
        getTokenDevice();
    }, [])
    const sendIs_confirm = async () => {
        const res = await fetch(URL + `api/noti-parking/change-confirm`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                notice_id: _id
            })
        })
        console.log(res.status);
        if (res.status === 200) {
            const result = await res.json();
            console.log("RESULT ", result);
        }
    }
    const feedback = async () => {
        const res = await fetch(URL + `api/noti-parking/create`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                title: 'Xác nhận khiếu nại',
                content: 'Báo cáo của anh/chị đã được tiếp nhận. BQL sẽ tiến hành xử lý. Cảm ơn báo cáo của anh/chị.',
                user_id: author
            })
        })
        console.log(res.status);
        if (res.status === 200) {
            const result = await res.json();
            console.log("RESULT ", result);
        }
    }
    const pushNotify = async () => {
        const res = await fetch(URL + `api/push-noti/add-notice`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                tokens: [
                    `${tokenDevices}`
                ],
                title: "Bãi xe",
                body: "Khiếu nại bạn đã được giải quyết",
                type: 2

            })

        })
        console.log("STATUS PUSH", res.status);
    }
    const handleIs_confirm = () => {
        pushNotify();
        sendIs_confirm();
        feedback();
        props.navigation.navigate(ScreenKey.AllUser,{
            searchText:license_plate
        })
    }
    return (
        <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../image/bgDetail.jpg')}>
            <ScrollView style={styles.container}>
                <View>
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <View style={styles.icon_title}>
                            <Icon name='topic'
                                type='material'
                                color='#e74c3c'
                                size={30}
                            />
                            <Text style={styles.text}>Chủ đề</Text>
                        </View>

                    </View>

                    <Text style={styles.text_input}>{title}</Text>

                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='content-paste'
                            type='material-community'
                            color='#9b59b6'
                            size={30}
                        />
                        <Text style={styles.text}>Nội dung</Text>
                    </View>

                    <Text style={styles.text_input}>{content}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='user'
                            type='entypo'
                            color='#9b59b6'
                            size={30}
                        />
                        <Text style={styles.text}>Người báo cáo</Text>
                    </View>

                    <Text style={styles.text_input}>{name}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='date'
                            type='fontisto'
                            color='#34495e'
                            size={25}
                        />
                        <Text style={styles.text}>Ngày báo cáo</Text>
                    </View>

                    <Text style={styles.text_input}>{create_date}</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <View style={styles.icon_title}>
                        <Icon name='date'
                            type='fontisto'
                            color='#34495e'
                            size={25}
                        />
                        <Text style={styles.text}>Nhập biển số xe từ hình</Text>
                    </View>

                    <View style={styles.inputContainer}>
                     
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                           
                            onChangeText={(text) => setLicense_plate(text)}

                        />
                    </View>
                </View>
                <View style={{ marginTop: 30 }}>
                    {statusImage && (
                        <View style={styles.icon_title}>
                            <Icon name='image'
                                type='font-awesome'
                                color='#f1c40f'
                                size={25}
                            />
                            <Text style={styles.text}>Hình ảnh</Text>
                        </View>)}


                    <ImageZoom cropWidth={Dimensions.get('window').width}
                        cropHeight={Dimensions.get('window').height / 2}
                        imageWidth={300}
                        imageHeight={300}
                        enableSwipeDown={true}
                    >

                        <Image style={{ width: 300, height: 300 }}
                            source={{
                                uri: `${_image}`,
                            }} />


                    </ImageZoom>
                </View>
                {/* <Image cloudName="datnqlcc" publicId="datn-qlcc/gookgudncaqq6i28ez1s" width="300" crop="scale"/> */}

                <View style={styles.myButtonContainer}>
                    <View style={styles.rowButton}>
                        {btnConfirm && (
                            <TouchableOpacity style={styles.appButtonContainer} onPress={handleIs_confirm} >
                                <View style={styles.myButton}>
                                    <Text style={styles.appButtonText}>Giải quyết</Text>
                                </View>
                            </TouchableOpacity>
                        )}


                    </View>

                </View>

            </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10

    },
    icon_title: {
        flexDirection: 'row',
        // paddingTop: 10,
        elevation: 8

    },
    button_image: {
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 10
        // justifyContent:'center'

    },
    text: {
        color: '#1abc9c',
        fontSize: 20,
        marginTop: 2,
        marginLeft: 5,



    },

    text_status: {
        marginTop: 20,
        paddingTop: 10
    },

    text_input: {
        color: '#34495e',
        fontSize: 20,
        marginTop: 10,
        borderColor: '#2ecc71',
        borderBottomWidth: 0.3


    },
    button: {
        // marginLeft:10,
        // marginRight:10
    },
    tinyLogo: {
        width: 200,
        height: 200,
    },
    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        marginBottom: 10
        // backgroundColor:'red'
    }, rowButton: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around'
    }, appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 10
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    input: {
        // width: WIDTH - 55,
        // height: 45,
        borderRadius: 10,
        fontSize: 20,
        borderBottomWidth: 0.3,
        // paddingLeft: 20,
        // backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'black',
        borderColor: '#2ecc71',
        // marginHorizontal: 25
      },
});