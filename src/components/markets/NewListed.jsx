import React, {memo} from 'react';
import {Text, View} from 'react-native';

const NewListed = memo(() => {
  return (
    <View>
      <Text style={{color: '#fff'}}>Newly Listed</Text>
    </View>
  );
});

export default NewListed;
