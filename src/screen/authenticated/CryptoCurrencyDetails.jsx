import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Candlestick from '../../components/crypto-currency-details/CandleStickChart';
import BarChart from '../../components/crypto-currency-details/BarChart';
import CandleStickStatChart from '../../components/crypto-currency-details/CandleStickStatChart';
import TabSection from '../../components/crypto-currency-details/TabSection';
import {useNavigation} from '@react-navigation/native';
import OrderBookChart from '../../components/crypto-currency-details/OrderBookData';
import BarChart2 from '../../components/crypto-currency-details/BarChart2';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const CryptoCurrencyDetails = memo(route => {
  // const item = route.route.params.item;
  const [isTab, setIsTab] = useState('30m');
  const [isactiveTab, setActiveTab] = useState('dea');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4E4E4E', '#373737', '#373737']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.topChartSection}>
        <View style={styles.topSection}>
          <LinearGradient
            colors={['#575757', '#5F5F5F', '#727272']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.scannerBtn}>
              <AntDesign name="arrowleft" size={24} color="#949494" />
            </TouchableOpacity>
          </LinearGradient>

          <Text style={styles.topSectionTitle}>TON</Text>

          <LinearGradient
            colors={['#575757', '#5F5F5F', '#727272']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              onPress={() => console.log('notify')}
              style={styles.favBtn}>
              <AntDesign name="star" size={22} color="#949494" />
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={styles.cryptoInfo}>
            <Image
              source={require('../../assets/icon/ton.png')}
              resizeMode="cover"
              style={{width: 34, height: 34}}
            />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="euro" size={13} color="#E4E4E4" />
                <Text style={{color: '#E4E4E4', fontSize: 14, marginLeft: 1}}>
                  4.135802
                </Text>
              </View>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: '#d4d4E0',
                  fontSize: 12,
                }}>
                TONCOIN PRICE
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{color: '#F7F0DB', fontSize: 17, fontWeight: 'medium'}}>
              +2.75%
            </Text>
          </View>
        </View>
        <View style={{marginTop: 5}}>
          <Candlestick />
        </View>
        <View style={{marginTop: 10}}>
          <BarChart />
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#4E4E4E', '#444444', '#262626']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={{flex: 1, flex: 0.5}}>
        <View>
          <TabSection isTab={isTab} setIsTab={setIsTab} />
          <View
            style={{
              paddingHorizontal: 22,
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              zIndex: 1,
            }}>
            <TouchableOpacity onPress={() => setActiveTab('dif')}>
              <Text
                style={{
                  color: isactiveTab === 'dif' ? '#E9E6D8' : '#7F7F7F',
                  fontSize: 12,
                }}>
                DIF-331.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('dea')}>
              <Text
                style={{
                  color: isactiveTab === 'dea' ? '#E9E6D8' : '#7F7F7F',
                  fontSize: 12,
                }}>
                DEA-711.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('macd')}>
              <Text
                style={{
                  color: isactiveTab === 'macd' ? '#E9E6D8' : '#7F7F7F',
                  fontSize: 12,
                }}>
                MACD-6.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('vol')}>
              <Text
                style={{
                  color: isactiveTab === 'vol' ? '#E9E6D8' : '#7F7F7F',
                  fontSize: 12,
                }}>
                VOL 203.11
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: responsiveHeight(9)}}>
            <CandleStickStatChart />
            <View style={{position: 'absolute', bottom: 0}}>
              <BarChart2 />
            </View>
          </View>
        </View>
        <View>
          <OrderBookChart />
        </View>
      </LinearGradient>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topChartSection: {
    flex: 0.5,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  scannerBtn: {
    position: 'relative',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#929292',
  },
  favBtn: {
    position: 'relative',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#929292',
  },
  topSectionTitle: {
    fontSize: 22,
    color: '#fff',
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CryptoCurrencyDetails;
