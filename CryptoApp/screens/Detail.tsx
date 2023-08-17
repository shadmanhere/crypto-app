import React from 'react';
import {View, Text} from 'react-native';

export const DetailScreen = ({route}: {route: any}) => {
  const id = route.params.id;
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>{id}</Text>
    </View>
  );
};
