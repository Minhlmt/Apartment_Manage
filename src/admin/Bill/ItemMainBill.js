// import React, { useEffect, useState } from 'react';
// import { StyleSheet, SectionList, Text, View, Image, TouchableOpacity } from 'react-native';
// import { Icon } from 'react-native-elements'
// import {ScreenKey} from '../globals/constants'
// export default function ItemMainBill(props) {
//     console.log(props.image)
//     const [temp,settemp]=useState('')
//     const handleClick = () => {
//         if (props.id === ScreenKey.SumBill)
           
//         if (props.id === ScreenKey.Statistic)
           
//     }
//     return (
//         <View >
//             <TouchableOpacity style={styles.container1} onPress={handleClick}>

//                 <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} source={require('../../../image/billHistory.png')} />
//                 <Text style={styles.text}>{props.title} </Text>

//                 <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, }}>
//                     <Icon name='arrow-forward-ios'
//                         type='material'
//                         color='#3498db'
//                         size={20}
//                     />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container1: {
//         flexDirection: 'row',
//         backgroundColor: "rgba(255, 255, 255, 0.2)",
//         borderBottomColor: 'gray',
//         borderBottomWidth: 1,
//         marginTop: 10,
//         padding: 8,
//         paddingVertical: 14,
//         paddingHorizontal: 15,
//         elevation: 3,
//         justifyContent: 'space-between'


//     },
//     text: {
//         flex: 1,
//         color: 'rgba(3, 0, 0, 0.7)',
//         marginBottom: 5,
//         fontSize: 20,
//         marginTop:10,
//         marginLeft:10
//     },
// });