import React from 'react';
import {View, Text, FlatList} from 'react-native';
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

const renderItem = ({item}: {item: Crypto}) => {
  return <Text>{item.name}</Text>;
};

export const HomeScreen = ({}: {navigation: any}) => {
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
