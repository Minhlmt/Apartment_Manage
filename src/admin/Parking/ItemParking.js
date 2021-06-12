import React,{useEffect, useState,useContext} from 'react'
import {Text,StyleSheet,View,TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {ScreenKey,URL,TokenContext} from '../globals/constants'
function ItemParking(props){
    const token = useContext(TokenContext).token;
    const [status,setStatus]=useState();
    const [create_date,setCreate_date]=useState();
    const [name,setName]=useState('');
    const getName = async () => {
        const res = await fetch(URL+`api/user/${props.item.author}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + `${token}`,
                'Content-Type': "application/json",
            },
        })
        
        if (res.status===200){
            const result =await res.json();
        
            setName(result.data.name);
        }
    }
    useEffect(()=>{
        getName();
        if(props.item.is_confirm){
            setStatus("")
        }
        else{
            setStatus("chưa xử lý")
        }

        var date = new Date(props.item.create_date);
        setCreate_date(date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() + ":" + date.getSeconds());
        
    },[props.item.is_confirm])
    const handleDetailParking=()=>{
        // setStatus('');
        props.navigation.navigate(ScreenKey.DetailParking,{
            item:props.item,
            create_date,name
        })
    }
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.container1} onPress={handleDetailParking}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Text style={styles.text}>{props.item.title} </Text>
                    <Text style={styles.sumPrice}>{name}</Text>
                    <Text style={styles.sumPrice}>{create_date} </Text>

                </View>
                <View style={{ flexDirection: 'column'}}>
                    
                        <Text style={styles.status_done}>{status}</Text>

                        <Icon name='arrow-forward-ios'
                            type='material'
                            color='#3498db'
                            size={20}
                            style={{alignItems:'flex-end'}}
                        />
                    
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
        color: 'red'
    },
    status_false: {
        color: 'red'
    },
    sumPrice: {
        color: '#800000'
    }
});
export default React.memo(ItemParking);