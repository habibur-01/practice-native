import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Candlestick from './CandleSticks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../../theme/ThemeContext';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
const data = [
  {
    id: 1,
    symbol: 'LINK',
    name: 'CHAINLINK',
    price: '18.67',
    change: '+6.81%',
    lightIcon: require('../../assets/icon/link.png'),
    darkIcon: require('../../assets/icon/link-dark.png'),
  },
  {
    id: 2,
    symbol: 'TON',
    name: 'TONCOIN',
    price: '18.67',
    change: '+92.81%',
    lightIcon: require('../../assets/icon/ton.png'),
    darkIcon: require('../../assets/icon/ton-dark.png'),
  },
  {
    id: 3,
    symbol: 'SOL',
    name: 'SOLANA',
    price: '18.67',
    change: '+6.81%',
    lightIcon: require('../../assets/icon/solana.png'),
    darkIcon: require('../../assets/icon/solana-dark.png'),
  },
  {
    id: 4,
    symbol: 'APT',
    name: 'APTOS',
    price: '18.67',
    change: '+6.81%',
    lightIcon: require('../../assets/icon/apt.png'),
    darkIcon: require('../../assets/icon/crypto-coin.png'),
  },
  {
    id: 5,
    symbol: 'SHIB',
    name: 'SHIBA INU',
    price: '18.67',
    change: '+6.81%',
    lightIcon: require('../../assets/icon/shib.png'),
    darkIcon: require('../../assets/icon/shib-dark.png'),
  },
];

const AssetsList = memo(() => {
  const navigation = useNavigation();
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  return (
    <View>
      {data.map(item => {
        return (
          <LinearGradient
            key={item?.id}
            colors={
              darkMode
                ? ['#3f3f3f', '#383737', '#575757', '#5C5C5C']
                : ['#ffffff', '#F6F6F6']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: darkMode ? '#7B7B7B' : '#e8e9ea',
              marginBottom: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('CRYPTO_DETAILS', {item})}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={darkMode ? item?.lightIcon : item?.darkIcon}
                  resizeMode="cover"
                  style={{width: 34, height: 34}}
                />
                <View>
                  <Text
                    style={{
                      color: darkMode ? '#E8E8E8' : '#010101',
                      fontSize: responsiveFontSize(1.6),
                    }}>
                    {item?.symbol}
                  </Text>
                  <Text
                    style={{
                      color: '#909090',
                      fontSize: responsiveFontSize(1.5),
                    }}>
                    {item?.name}
                  </Text>
                </View>
              </View>
              <View>
                <Candlestick width={134} height={38} />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <MaterialIcons
                    name="euro"
                    size={14}
                    color={darkMode ? '#F6F6F6' : '#010101'}
                  />
                  <Text
                    style={{
                      color: darkMode ? '#F6F6F6' : '#010101',
                      alignSelf: 'flex-end',
                    }}>
                    {item?.price}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: responsiveFontSize(1.6),
                    color: darkMode ? '#DAD6C3' : '#A0A0A0',
                    alignSelf: 'flex-end',
                  }}>
                  {item?.change}
                </Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
        );
      })}
    </View>
  );
});

export default AssetsList;
