import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import {API_URL} from '@env';
import {CryptoMarketDataInit, CryptoProfileInit} from '../models/crypto';

export const DetailScreen = ({route}: {route: any}) => {
  const {width} = useWindowDimensions();
  const id = route.params.id;
  const [cryptoProfile, setCryptoProfile] = useState(CryptoProfileInit);
  const [cryptoMarketData, setCryptoMarketData] =
    useState(CryptoMarketDataInit);
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
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{cryptoProfile.name}</Text>
              <Text style={styles.symbol}>{cryptoProfile.symbol}</Text>
              <Text style={styles.price}>
                {`$ ${convert(cryptoMarketData.market_data.price_usd)}`}
              </Text>
            </View>
            <View style={styles.headerTagline}>
              <Text style={styles.tagline}>
                {cryptoProfile.profile.general.overview.tagline}
              </Text>
            </View>
          </View>
          <View style={styles.priceChanges}>
            <View style={styles.priceChangeRow}>
              <Text style={styles.tagline}>Percent Change 1h</Text>
              <Text style={styles.tagline}>
                {` % ${convert(
                  cryptoMarketData.market_data.percent_change_usd_last_1_hour,
                )}`}
              </Text>
            </View>
            <View style={styles.priceChangeRow}>
              <Text style={styles.tagline}>Percent Change 24h</Text>
              <Text style={styles.tagline}>
                {` % ${convert(
                  cryptoMarketData.market_data.percent_change_usd_last_24_hours,
                )}`}
              </Text>
            </View>
          </View>
          <ScrollView style={styles.cryptoInfo}>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Overview</Text>
              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<p style="color: #fff">${cryptoProfile.profile.general.overview.project_details}</p>`,
                }}
              />
            </View>
            <View style={styles.cryptoInfoRow}>
              <Text style={styles.cryptoInfoTitle}>Background</Text>

              <RenderHtml
                contentWidth={width}
                source={{
                  html: `<p style="color: #fff">${cryptoProfile.profile.general.background.background_details}</p>`,
                }}
              />
            </View>
          </ScrollView>
        </View>
      )}

      {!cryptoDataLoaded && (
        <View style={[styles.loadingContainer, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffab00" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272d42',
    padding: 10,
    flex: 1,
  },
  header: {
    backgroundColor: '#000',
    height: 100,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTagline: {
    marginTop: 10,
  },
  tagline: {
    color: '#fff',
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    color: '#fff',
  },
  symbol: {
    fontSize: 15,
    padding: 5,
    backgroundColor: '#272d42',
    color: '#fff',
  },

  price: {
    fontSize: 28,
    color: '#ffab00',
    width: 150,
    textAlign: 'right',
  },

  priceChanges: {
    backgroundColor: '#000',
    height: 70,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  priceChangeRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cryptoInfo: {
    backgroundColor: '#000',
    padding: 10,
    flex: 1,
    borderRadius: 10,
    marginBottom: 15,
  },
  cryptoInfoTitle: {
    color: '#ffab00',
    fontSize: 22,
    marginBottom: 5,
  },
  cryptoInfoRow: {
    flex: 1,
    marginBottom: 25,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

const convert = (price: number) => {
  return Math.round(price * 100) / 100;
};
