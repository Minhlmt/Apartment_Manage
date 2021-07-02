import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity, Modal, Dimensions, ScrollView, TextInput, FlatList, Alert } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fundation from 'react-native-vector-icons/Foundation';
import { Fumi } from 'react-native-textinput-effects';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { ImageBackground } from 'react-native';
import { TokenContext, URL, token } from '../../globals/constants'

import { Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider, MenuContext } from 'react-native-popup-menu';
const { width: WIDTH } = Dimensions.get('window')
export default function ChangeInfo(props) {
    // const token=useContext(TokenContext)
    const [user, setUser] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [identify_card, setIdentify_card] = useState('');
    const [native_place, setNative_place] = useState('');
    const [nameSelectBlock, setnameSelectBlock] = useState([]);
    const [idSelectBlock, setIdSelectBlock] = useState([]);
    const [nameApart, setNameApart] = useState([]);
    const [idApart, setIdApart] = useState([]);
    const [search, setSearch] = useState('');
    const [block, setBlock] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [licenseString, setLicenseString] = useState('');
    const [license_plates, , setlicense_plates] = useState([]);
    const [filterData, setFilterData] = useState([{
        "name": "A301",
        "_id": "6061cce41d1f123978339d9a",

    },
    {
        "name": "A302",
        "_id": "6061cce41d1f123978339d9a",

    }]);
    const [masterData, setMasterData] = useState([
        {
            "name": "A301",
            "_id": "6061cce41d1f123978339d9a",

        },
        {
            "name": "A302",
            "_id": "6061cce41d1f123978339d9a",

        }
    ]);
    const getBlock = async () => {
        const res = await fetch(URL + `api/block/all`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })

        if (res.status === 200) {
            const result = await res.json();

            setBlock(result.data);

        }
    }
    const getApart = async (block_id) => {
        const res = await fetch(URL + `api/apart/all-aparts?block=${block_id}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
        })
        console.log("STATUS ",res.status);
        if (res.status === 200) {
            const result = await res.json();
            setFilterData(result.data);
            setMasterData(result.data);

        }
    }

    const handleSendData = () => {
        cutLicense_plates();
        //Check for the Email TextInput
         if (!name.trim()) {
            Alert.alert('Thông báo', 'Tên không được trống');
            return;
        }
        else if (!phone.trim()) {
            Alert.alert('Thông báo', 'Điện thoại không được trống');
            return;
        }
        else if (!email.trim()) {
            Alert.alert('Thông báo', 'Email không được trống');
            return;
        }
        else if (!identify_card.trim()) {
            Alert.alert('Thông báo', 'CMND/CCCD không được trống');
            return;
        }
        else if (!native_place.trim()) {
            Alert.alert('Thông báo', 'Quê quán không được trống');
            return;
        }
        else if (idSelectBlock.length === 0) {
            Alert.alert('Thông báo', 'Tòa không được trống');
            return;
        }
        else if (idApart.length === 0) {
            Alert.alert('Thông báo', 'Nhà không được trống');
            return;
        }
        else {
            sendData();
        }

    }
    const sendData = async () => {
        const res = await fetch(URL + `api/user/add`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name,
                phone,
                email,
                identify_card,
                native_place,
                apartment_id: idApart,
                block_id: idSelectBlock,
                license_plates: license_plates
        
            })
        })

        if (res.status === 200) {
            alert("Tạo tài khoản thành công");
        }
        else {
            alert("Tạo tài khoản thất bại")
        }
    }
    const cutLicense_plates = () => {

        if (licenseString.length !== 0) {

            const words = licenseString.split(' ');
            for (let word of words) {
                license_plates.push(word);
            }

        }

    }
    useEffect(() => {
        getBlock()
    }, [])
    const ItemView = (item) => {
        return (
            <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {

                    setIdApart(oldArray => [...oldArray, item.item._id]);
                    setNameApart(oldArray => [...oldArray, item.item.name])
                    setModalVisible(false);
                }}
            >
                <Text >{item.item.name}</Text>
            </TouchableOpacity>

        )
    }
    const handlenameSelectBlock = (item) => {



        setnameSelectBlock(oldArray => [...oldArray, item.name]);
        setIdSelectBlock(oldArray => [...oldArray, item._id]);


        getApart(item._id);
    }
    const hanldeChooseHouse = () => {

        setModalVisible(true)
    }
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ?
                    item.name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return (itemData.indexOf(textData) > -1);
            });
            setFilterData(newData);
            setSearch(text);
        }
        else {
            setFilterData(masterData);
            setSearch(text);
        }
    }
    const handleDeleteBlock = () => {
        setIdSelectBlock([]);
        setIdApart([]);
        setNameApart([]);
        setnameSelectBlock([]);
    }
    const handleDeleteApart=()=>{
        setIdApart([]);
        setNameApart([]);
    }
    return (

        <MenuProvider>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Mời chọn căn hộ</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                value={search}
                                placeholder='search here'
                                underlineColorAndroid="transparent"
                                onChangeText={(text) => searchFilter(text)}
                            />
                        </View>
                        <FlatList
                            data={filterData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(item) => ItemView(item)}
                        />
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose, { flexDirection: 'row', width: 200, justifyContent: 'center', backgroundColor: '#c0392b' }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text >Thoát</Text>
                        </TouchableOpacity>



                    </View>

                </View>

            </Modal>




         
                <ImageBackground style={{ flex: 1, resizeMode: 'cover' }} source={require('../../../../image/background.jpg')}>
                <ScrollView>
                    <Spinner
                        visible={spinner}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'Họ và tên'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user-circle-o'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 ,color:'white'}}
                            onChangeText={(text) => setName(text)}

                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'Điện thoại'}
                            iconClass={FontAwesomeIcon}
                            iconName={'phone'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
                            onChangeText={(text) => setPhone(text)}
                            keyboardType="numeric"

                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'Email'}
                            iconClass={Fundation}
                            iconName={'mail'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'CMND/CCCD'}
                            iconClass={FontAwesomeIcon}
                            iconName={'id-card'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
                            onChangeText={(text) => setIdentify_card(text)}

                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'Quê quán'}
                            iconClass={Fontisto}
                            iconName={'island'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
                            onChangeText={(text) => setNative_place(text)}

                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Fumi
                            label={'Biển số xe'}
                            iconClass={FontAwesomeIcon}
                            iconName={'drivers-license-o'}
                            iconColor={'white'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            labelStyle={{color:'white'}}
                            inputStyle={{color:'white'}}
                            style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 10 }}
                            onChangeText={(text) => setLicenseString(text)}

                        />

                    </View>
                    <Menu onSelect={(value) => handlenameSelectBlock(value)}>
                        <MenuTrigger style={[styles.selectView, { flexDirection: 'row', justifyContent: 'space-between' }]}>

                            <Text style={styles.text}>Tòa</Text>



                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.text]}>{nameSelectBlock}</Text>
                                <TouchableOpacity style={{ marginRight: 15, marginTop: 10 }} onPress={handleDeleteBlock}>
                                    <FontAwesomeIcon name='trash' size={25} />
                                </TouchableOpacity>

                            </View>


                        </MenuTrigger>
                        <MenuOptions >
                            {block.map((item, index) => (

                                <MenuOption value={item} key={index}>

                                    <Text style={{ color: 'blue', fontWeight: 'bold' }}>{item.name}</Text>
                                </MenuOption>
                            ))}
                        </MenuOptions>
                    </Menu>
                    <TouchableOpacity onPress={hanldeChooseHouse}>
                        <View style={[styles.selectView, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={styles.text}>Nhà</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.text, { marginRight: 15 }]}>{nameApart}</Text>
                                <TouchableOpacity style={{ marginRight: 15, marginTop: 10 }} onPress={handleDeleteApart}>
                                    <FontAwesomeIcon name='trash' size={25} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                    </View>
                    <View style={styles.myButtonContainer}>
                        <TouchableOpacity style={styles.appButtonContainerLogOut} onPress={handleSendData}>
                            <View style={styles.myButtonLogOut}>
                                <Text style={styles.appButtonText}>Tạo tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    </ScrollView>
                </ImageBackground>
           
        </MenuProvider>

    )
}
const styles = StyleSheet.create({
    selectView: {
        borderRadius: 10,
        marginHorizontal: 10,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: 10,
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    inputContainer: {
        marginTop: 10,
        marginHorizontal: 10
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 20,
        paddingLeft: 45,
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'rgba(255,255,255,1)',
        marginHorizontal: 25
    },
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    text: {
        color: '#8e44ad',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
    },




    myButtonContainer: {
        display: 'flex',
        alignItems: 'stretch',
        flexDirection: 'column',
        // backgroundColor:'red'
    },
    appButtonContainerLogOut: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12, marginTop: 15,
        marginLeft: 10,
        marginRight: 10
    },
    myButtonLogOut: {
        alignItems: 'center',
        // marginTop:10,

    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        marginTop: 22
    },
    modalView: {
        flexDirection: 'column',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 2,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

});