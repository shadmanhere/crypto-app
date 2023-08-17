import React from 'react';
import {View, Text, Pressable, FlatList, StyleSheet} from 'react-native';
import {Crypto} from '../models/crypto';

const cryptoList: Crypto[] = [
  {
    id: '1',
    name: 'BTC',
    price: 3800.64,
  },
  {
    id: '2',
    name: 'ETH',
    price: 4000.0,
  },
  {
    id: '3',
    name: 'SQL',
    price: 250.21,
  },
];

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const openCryptoDetail = () => {
    navigation.navigate('Detail');
  };

  const renderItem = ({item}: {item: Crypto}) => {
    return (
      <Pressable style={styles.crypto} onPress={() => openCryptoDetail()}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptoList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#272d42',
    flex: 1,
  },
  crypto: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#000',
    flex: 1,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontSize: 24,
  },
  price: {
    color: '#ffab00',
    fontSize: 28,
  },
});
