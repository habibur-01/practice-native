import React, {memo} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Candlestick from './CandleSticks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const data = [
  {
    id: 1,
    symbol: 'LINK',
    name: 'CHAINLINK',
    price: '18.67',
    change: '+6.81%',
    icon: require('../../assets/icon/link.png'), // update if dynamic
  },
  {
    id: 2,
    symbol: 'TON',
    name: 'TONCOIN',
    price: '18.67',
    change: '+6.81%',
    icon: require('../../assets/icon/ton.png'), // update if dynamic
  },
  {
    id: 3,
    symbol: 'SOL',
    name: 'SOLANA',
    price: '18.67',
    change: '+6.81%',
    icon: require('../../assets/icon/solana.png'), // update if dynamic
  },
  {
    id: 4,
    symbol: 'APT',
    name: 'APTOS',
    price: '18.67',
    change: '+6.81%',
    icon: require('../../assets/icon/apt.png'), // update if dynamic
  },
  {
    id: 5,
    symbol: 'SHIB',
    name: 'SHIBA INU',
    price: '18.67',
    change: '+6.81%',
    icon: require('../../assets/icon/shib.png'), // update if dynamic
  },
];

const AssetsList = memo(() => {
  const navigation = useNavigation();
  return (
    <View>
      {data.map(item => {
        return (
          <LinearGradient
            key={item?.id}
            colors={['#3f3f3f', '#444444', '#575757', '#5C5C5C']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              padding: 10,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#7B7B7B',
              marginBottom: 5,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate('CRYPTO_DETAILS', {item})}>
              <View style={{flexDirection: 'row', gap: 10}}>
                <Image
                  source={item?.icon}
                  resizeMode="cover"
                  style={{width: 36, height: 36}}
                />
                <View>
                  <Text style={{color: '#E8E8E8', fontSize: 15}}>
                    {item?.symbol}
                  </Text>
                  <Text style={{color: '#909090', fontSize: 14}}>
                    {item?.name}
                  </Text>
                </View>
              </View>
              <View>
                <Candlestick width={134} height={42} />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                  }}>
                  <MaterialIcons name="euro" size={14} color="#F6F6F6" />
                  <Text style={{color: '#F6F6F6', alignSelf: 'flex-end'}}>
                    {item?.price}
                  </Text>
                </View>
                <Text style={{color: '#DAD6C3', alignSelf: 'flex-end'}}>
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
