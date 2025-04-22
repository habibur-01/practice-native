import React, {memo, useMemo} from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';

const ExchangeScreen = memo(() => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  const chartI = useMemo(() => new ItcChartService(), []);

  return (
    <View style={{backgroundColor: '#010101', flex: 1}}>
      <Text style={{color: darkMode ? '#fff' : '#010101'}}>
        Exchnage Screen
      </Text>
    </View>
  );
});

export default ExchangeScreen;
