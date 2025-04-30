import React, {memo} from 'react';
import {Text, View} from 'react-native';

const CardInfoScreen = memo(({route}) => {
  console.log(route);
  return (
    <View>
      <Text style={{color: 'red'}}>Card Info</Text>
    </View>
  );
});

export default CardInfoScreen;
