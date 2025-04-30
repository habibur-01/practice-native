import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ExchangeCard from '../../components/exchange/ExchangeCard';

const ExchangeScreen = memo(({navigation}) => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  return (
    <LinearGradient
      colors={
        darkMode
          ? ['#585858', '#4F4F4F', '#1e1e1e', '#0f0f0f', '#0f0f0f']
          : ['#f6f8fa', '#f6f8fa']
      }
      style={{backgroundColor: '#010101', flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <LinearGradient
            colors={['#575757', '#5F5F5F', '#727272']}
            style={styles.backBtn}>
            <AntDesign name="arrowleft" size={24} color="#A0A0A0" />
          </LinearGradient>
        </TouchableOpacity>
        <Text
          style={[
            styles.topSectionTitle,
            {color: darkMode ? '#fff' : '#010101', textTransform: 'uppercase'},
          ]}>
          Exchange
        </Text>
        <View></View>
      </View>
      <View style={{padding: 20}}>
        <ExchangeCard />
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: '#575757',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A0A0A0',
  },
  topSectionTitle: {
    fontSize: 18,
    letterSpacing: 2,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 22,
    color: '#fff',
  },
});

export default ExchangeScreen;
