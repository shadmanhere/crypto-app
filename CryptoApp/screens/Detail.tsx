import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import {API_URL} from '@env';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState();
  const [cryptoMarketData, setCryptoMarketData] = useState();
  const [cryptoDataLoaded, setCryptoDataLoaded] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/cryptos/profile/${id}`),
      axios.get(`${API_URL}/cryptos/market-data/${id}`),
    ]).then(([resProfile, reMarketData]) => {
      setCryptoProfile(resProfile.data);
      setCryptoMarketData(reMarketData.data);
      setCryptoDataLoaded(true);
    });
  }, [id]);
  return (
    <>
      {cryptoDataLoaded && (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>{JSON.stringify(cryptoProfile)}</Text>
        </View>
      )}

      {!cryptoDataLoaded && (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffab00" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
