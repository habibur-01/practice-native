import React, {memo, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Candlestick from '../../components/crypto-currency-details/CandleStickChart';
import BarChart from '../../components/crypto-currency-details/BarChart';
import CandleStickStatChart from '../../components/crypto-currency-details/CandleStickStatChart';
import TabSection from '../../components/crypto-currency-details/TabSection';

const CryptoCurrencyDetails = memo(route => {
  // const item = route.route.params.item;
  const [isTab, setIsTab] = useState(false);
  console.log('🚀 ~ isTab:', isTab);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4E4E4E', '#444444', '#373737']}
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
              onPress={() => console.log('pressed')}
              style={styles.scannerBtn}>
              <MaterialCommunityIcons
                name="credit-card-scan-outline"
                size={26}
                color="#A0A0A0"
              />
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
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={styles.cryptoInfo}>
            <Image
              source={item?.icon}
              resizeMode="cover"
              style={{width: 36, height: 36}}
            />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons name="euro" size={12} color="#FEFEFE" />
                <Text style={{color: '#FEFEFE', fontSize: 16, marginLeft: 1}}>
                  4.135802
                </Text>
              </View>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: '#d4d4E0',
                  fontSize: 13,
                }}>
                TONCOIN PRICE
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{color: '#FCE3B7', fontSize: 18, fontWeight: 'medium'}}>
              +2.75%
            </Text>
          </View>
        </View> */}
        <View style={{marginTop: 10}}>
          <Candlestick />
        </View>
        <View>
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
          <View>
            <CandleStickStatChart />
          </View>
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

  // activeTabIndicator: {
  //   borderTop
  // },
});

export default CryptoCurrencyDetails;
