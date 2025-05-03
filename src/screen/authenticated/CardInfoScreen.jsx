import React, {memo} from 'react';
import {Image, Text, View} from 'react-native';

const CardInfoScreen = memo(({image}) => {
  console.log(image);
  return (
    <View>
      <Text style={{color: 'red'}}>Card Info</Text>
      {/* <Image source={{uri: route.params.image}} /> */}
    </View>
  );
});

export default CardInfoScreen;
