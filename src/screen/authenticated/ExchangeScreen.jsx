import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';

const ExchangeScreen = memo(() => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  return (
    <View>
      <Text style={{color: darkMode ? '#fff' : '#010101'}}>
        Exchnage Screen
      </Text>
    </View>
  );
});

export default ExchangeScreen;
