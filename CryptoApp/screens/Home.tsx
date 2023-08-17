import React from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
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
      <Pressable onPress={() => openCryptoDetail()}>
        <Text>{item.name}</Text>
        <Text>{item.price}</Text>
      </Pressable>
    );
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FlatList
        data={cryptoList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
