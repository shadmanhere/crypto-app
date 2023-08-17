import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/profile/${id}`),
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
    ]).then(([resProfile, reMarketData]) => {
      setCryptoProfile(resProfile.data);
      setCryptoMarketData(reMarketData.data);
    });
  }, [id]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{JSON.stringify(cryptoProfile)}</Text>
    </View>
  );
};
