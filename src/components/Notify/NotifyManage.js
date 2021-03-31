import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Item from '../Home/Items/ItemNotification'
import {URL} from '../../globals/constants'

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container1} onPress >
      <Image style={{ width: 50, height: 50, borderRadius: 400 / 2 }} source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }} />
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  
  );
};

let stopFetchMore = true;

const ListFooterComponent = () => (
  <Text
    style={{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 5,
    }}
  >
    Loading...
  </Text>
);

export default function App() {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  // const fetchData = async () => {
  //   const response = await fakeServer(20);
  //   setData([...response]);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);
  // const getdata= async()=>{
  //   const res=fetch(URL+'')
  // }

  const handleOnEndReached = async () => {
    // setPage(page + 1);
    // console.log(page);
    // setLoadingMore(true);
    // if (!stopFetchMore) {
    //   const response = await fakeServer(20);
    //   if (response === 'done') return setLoadingMore(false);
    //   setData([...data, ...response]);
    //   stopFetchMore = true;
    // }
    // setLoadingMore(false);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={renderItem}
      onEndReached={handleOnEndReached}
      onEndReachedThreshold={0.1}
      onScrollBeginDrag={() => {
        stopFetchMore = false;
      }}
      ListFooterComponent={() => loadingMore && <ListFooterComponent />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flexDirection: 'row',
    backgroundColor: "#BDC3C7",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 5
  },
  text: {
    flex: 1,
    color: 'black',
    marginBottom: 10,
    fontSize: 20
  }
});