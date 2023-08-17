import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();

  useEffect(() => {
    axios.get(`${API_URL}/cryptos/profile/${id}`).then(response => {
      setCryptoProfile(response.data);
    });

    axios.get(`${API_URL}/cryptos/market-data/${id}`).then(response => {
      setCryptoMarketData(response.data);
    });
  }, [id]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{JSON.stringify(cryptoProfile)}</Text>
    </View>
  );
};
