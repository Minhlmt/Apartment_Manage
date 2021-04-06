import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { URL } from '../../globals/constants'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemNotifyManger from '../../components/Home/Items/ItemNotifyManger'




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

export default function App(props) {
  const [data, setData] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [token, setToken] = useState();
  const [flag, setFlag] = useState(true);
  const [load,setLoad]=useState(false);
  const renderItem = ({ item }) => {
    return (
      <ItemNotifyManger id={item._id} title={item.title} is_read_user={item.is_read_user} 
      status={item.status} navigation={props.navigation} token={token}/>
      
    );
  };
  const getData = async () => {
    try {

      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const _token = JSON.parse(token);
        setToken(_token);
        setFlag(false);
      }

    } catch (e) {
      // error reading value
    }
  }

  const fetchData = async () => {
    console.log("token2 ", token)
    const res = await fetch(URL + `api/noti/all/${page}/10`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + `${token}`,
        'Content-Type': 'application/json',
      },
    })
    const result = await res.json();
    console.log('result ',res.status);
    console.log("res ", result);
    if (res.status === 200) {
      if (result.data.length === 0) {
        setPage(1);
        setLoad(true);
      }
      else {
        if(!load)
        {
          setData(data.concat(result.data));
        }
     
      }
    }
  }
  useEffect(() => {
    getData();
    fetchData();
  }, [flag]);

  const handleOnEndReached = async () => {
    setPage(page + 1);
    console.log(page);
    if(page!==1)
    {
      fetchData();
    }
    
    
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
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
    backgroundColor: "#EEEEEE",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 15,
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  container2: {
    flexDirection: 'row',
    backgroundColor: "#BBBBBB",
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 15,
    padding: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
  },
  text: {
    flex: 1,
    color: 'black',
    marginBottom: 10,
    fontSize: 20, marginLeft: 5
  }
});