import React, {memo, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BarChart from '../../components/crypto-currency-details/BarChart';
import CandleStickStatChart from '../../components/crypto-currency-details/CandleStickStatChart';
import TabSection from '../../components/crypto-currency-details/TabSection';
import {useNavigation} from '@react-navigation/native';
import OrderBookChart from '../../components/crypto-currency-details/OrderBookData';
import BarChart2 from '../../components/crypto-currency-details/BarChart2';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeContext';
import Chart from '../../components/crypto-currency-details/Chart';
const candlestickData = [
  [0.0315, 0.0317, 0.0314, 0.0318],
  [0.0317, 0.0318, 0.0316, 0.0319],
  [0.0318, 0.0316, 0.0315, 0.032],
  [0.0316, 0.0319, 0.0315, 0.0321],
  [0.0319, 0.032, 0.0318, 0.0322],
  [0.0312, 0.0314, 0.0311, 0.0316],
  [0.0314, 0.0313, 0.0312, 0.0317],
  [0.0313, 0.0311, 0.031, 0.0315],
  [0.0311, 0.0315, 0.031, 0.0316],
  [0.0315, 0.0317, 0.0314, 0.0318],
  [0.0317, 0.0318, 0.0316, 0.0319],
  [0.0318, 0.0316, 0.0315, 0.032],
  [0.0316, 0.0319, 0.0315, 0.0321],
  [0.0319, 0.032, 0.0318, 0.0322],
  [0.0319, 0.032, 0.0318, 0.0322],
  [0.0312, 0.0314, 0.0311, 0.0316],
  [0.0314, 0.0313, 0.0312, 0.0317],
  [0.0313, 0.0311, 0.031, 0.0315],
  [0.0319, 0.032, 0.0318, 0.0322],
  [0.0312, 0.0314, 0.0311, 0.0316],
  [0.0314, 0.0313, 0.0312, 0.0317],
  [0.0313, 0.0311, 0.031, 0.0315],
  [0.0311, 0.0315, 0.031, 0.0316],
  [0.0311, 0.0315, 0.031, 0.0316],
];

const CryptoCurrencyDetails = memo(route => {
  const item = route.route.params.item;
  console.log('🚀 ~ item:', item);
  const [isTab, setIsTab] = useState('30m');
  const [isactiveTab, setActiveTab] = useState('dea');
  const navigation = useNavigation();
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  const [data, setData] = useState(candlestickData);
  const [chartHeight, setChartHeight] = useState(responsiveHeight(17));
  const [chartWidth, setChartWidth] = useState();
  const {height, width} = useWindowDimensions();

  useEffect(() => {
    setChartHeight(responsiveHeight(22));
    setChartWidth(width - 20);
  }, [height, width]);

  useEffect(() => {
    if (isTab === '30m') {
      setData(candlestickData);
    } else {
      setData(candlestickData.slice(2, 32));
    }
  }, [isTab]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={
          darkMode ? ['#4E4E4E', '#373737', '#373737'] : ['#f6f8fa', '#e9ecef']
        }
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.topChartSection}>
        <View style={styles.topSection}>
          <LinearGradient
            colors={
              darkMode
                ? ['#575757', '#5F5F5F', '#727272']
                : ['#EFF3F4', '#EFF3F4']
            }
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.scannerBtn,
                {borderColor: darkMode ? '#929292' : '#e5e7e8'},
              ]}>
              <AntDesign
                name="arrowleft"
                size={24}
                color={darkMode ? '#949494' : '#A0A0A0'}
              />
            </TouchableOpacity>
          </LinearGradient>

          <Text
            style={[
              styles.topSectionTitle,
              {color: darkMode ? '#fff' : '#010101'},
            ]}>
            TON
          </Text>

          <LinearGradient
            colors={
              darkMode
                ? ['#575757', '#5F5F5F', '#727272']
                : ['#EFF3F4', '#EFF3F4']
            }
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            style={{borderRadius: 10}}>
            <TouchableOpacity
              onPress={() => console.log('notify')}
              style={[
                styles.favBtn,
                {borderColor: darkMode ? '#929292' : '#e5e7e8'},
              ]}>
              <AntDesign
                name="star"
                size={22}
                color={darkMode ? '#949494' : '#A0A0A0'}
              />
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
              source={darkMode ? item.lightIcon : item.darkIcon}
              resizeMode="cover"
              style={{width: 34, height: 34}}
            />
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialIcons
                  name="euro"
                  size={13}
                  color={darkMode ? '#E4E4E4' : '#010101'}
                />
                <Text
                  style={{
                    color: darkMode ? '#E4E4E4' : '#010101',
                    fontSize: 14,
                    marginLeft: 1,
                  }}>
                  4.135802
                </Text>
              </View>
              <Text
                style={{
                  textTransform: 'uppercase',
                  color: darkMode ? '#a2a2a5' : '#6b6b6b',
                  fontSize: 12,
                }}>
                {item?.name} PRICE
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                color: darkMode ? '#F7F0DB' : '#fcbb46',
                fontSize: 17,
                fontWeight: 'medium',
              }}>
              +2.75%
            </Text>
          </View>
        </View>

        {/* Live Chart section */}
        <View style={{marginTop: 5}}>
          <Chart chartHeight={chartHeight} chartWidth={chartWidth} />
        </View>
        <View style={{marginTop: 10}}>
          <BarChart />
        </View>
      </LinearGradient>

      {/* 2nd part section */}
      <LinearGradient
        colors={
          darkMode ? ['#4E4E4E', '#444444', '#262626'] : ['#f6f8fa', '#e9ecef']
        }
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
            }}>
            <TouchableOpacity onPress={() => setActiveTab('dif')}>
              <Text
                style={{
                  color:
                    isactiveTab === 'dif'
                      ? darkMode
                        ? '#E9E6D8'
                        : '#fcbb46'
                      : '#7F7F7F',
                  fontSize: 12,
                }}>
                DIF-331.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('dea')}>
              <Text
                style={{
                  color:
                    isactiveTab === 'dea'
                      ? darkMode
                        ? '#E9E6D8'
                        : '#fcbb46'
                      : '#7F7F7F',
                  fontSize: 12,
                }}>
                DEA-711.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('macd')}>
              <Text
                style={{
                  color:
                    isactiveTab === 'macd'
                      ? darkMode
                        ? '#E9E6D8'
                        : '#fcbb46'
                      : '#7F7F7F',
                  fontSize: 12,
                }}>
                MACD-6.21
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('vol')}>
              <Text
                style={{
                  color:
                    isactiveTab === 'vol'
                      ? darkMode
                        ? '#E9E6D8'
                        : '#fcbb46'
                      : '#7F7F7F',
                  fontSize: 12,
                }}>
                VOL 203.11
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{height: responsiveHeight(9)}}>
            <CandleStickStatChart data={data} />
            <View style={{position: 'absolute', bottom: 0, zIndex: 1}}>
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
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default CryptoCurrencyDetails;
