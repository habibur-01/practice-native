import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Candlestick from '../../components/markets/CandleSticks';
import AssetsList from '../../components/markets/AssetsList';
import TradableList from '../../components/markets/TradableList';
import NewListed from '../../components/markets/NewListed';

const MarketDuplicate = memo(() => {
  const [expandGainers, setExpandGainers] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const [isTabActive, setIsTabActive] = useState('assets');
  const navigation = useNavigation();
  const {theme, themeMode} = useState();
  const darkMode = themeMode === 'dark' ? true : false;
  return (
    <View style={styles.container}>
      {/* Top section */}
      <View style={styles.topSection}>
        <LinearGradient
          colors={['#EFF3F4', '#EFF3F4']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={[
            styles.scannerBtn,
            {borderColor: darkMode ? '#7B7B7B' : '#e5e7e8'},
          ]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </LinearGradient>

        <Text style={styles.topSectionTitle}>CRYFORGE</Text>

        <LinearGradient
          colors={['#EFF3F4', '#EFF3F4']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{borderRadius: 10}}>
          <TouchableOpacity
            onPress={() => console.log('notify')}
            style={[
              styles.notifyBtn,
              {borderColor: darkMode ? '#7B7B7B' : '#e5e7e8'},
            ]}>
            <Ionicons name="notifications-sharp" size={24} color="#A0A0A0" />
            <View style={styles.notifyBadge}>
              <Text style={styles.notifyBadgeText}>6</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Asset section */}
      <View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontSize: 20, color: '#010101'}}>ASSETS</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
              }}
              onPress={() => setExpandGainers(!expandGainers)}>
              <Text style={{color: '#3f3b3b', fontSize: 12}}>GAINERS</Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color="#3f3b3b"
              />
            </TouchableOpacity>
            {expandGainers && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  transform: 'translateY(30%)',
                  zIndex: 1,
                  width: 100,
                  backgroundColor: '#EFF3F4',
                  borderWidth: 1,
                  borderColor: '#fff',
                  padding: 10,
                  borderRadius: 12,
                }}>
                <TouchableOpacity style={{color: '#3f3b3b'}}>
                  <Text style={{color: '#3f3b3b'}}>All</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardWrapper} // Optional spacing
        >
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              width: responsiveWidth(43),
              height: responsiveHeight(18),
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#e8e9ea',
              paddingHorizontal: 20,
              paddingTop: 14,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/icon/stellar-black.png')}
                resizeMode="cover"
                style={{width: 36, height: 36}}
              />
              <View>
                <Text
                  style={{fontSize: 14, color: '#010101', fontWeight: 'bold'}}>
                  XLM
                </Text>
                <Text style={{fontSize: 12, color: '#3f3b3b'}}>STELLAR</Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Candlestick width={134} height={60} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: '#010101', fontSize: 14}}>
                  <FontAwesome6 name="euro-sign" size={12} color="#010101" />
                  0.16
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#010101', fontSize: 14}}>+6.49%</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              width: responsiveWidth(43),
              height: responsiveHeight(18),
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#e8e9ea',
              paddingHorizontal: 20,
              paddingTop: 14,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/icon/sfp.png')}
                resizeMode="cover"
                style={{width: 36, height: 36}}
              />
              <View>
                <Text
                  style={{fontSize: 14, color: '#010101', fontWeight: 'bold'}}>
                  SFP
                </Text>
                <Text style={{fontSize: 12, color: '#3f3b3b'}}>SAFEPAL</Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Candlestick width={134} height={60} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: '#010101', fontSize: 14}}>
                  <FontAwesome6 name="euro-sign" size={12} color="#010101" />
                  0.72
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#010101', fontSize: 14}}>+0.11%</Text>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient
            colors={['#ffffff', '#ffffff', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              width: responsiveWidth(43),
              height: responsiveHeight(18),
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#e8e9ea',
              paddingHorizontal: 20,
              paddingTop: 14,
              overflow: 'hidden',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <Image
                source={require('../../assets/icon/stellar-black.png')}
                resizeMode="cover"
                style={{width: 36, height: 36}}
              />
              <View>
                <Text
                  style={{fontSize: 14, color: '#010101', fontWeight: 'bold'}}>
                  XLM
                </Text>
                <Text style={{fontSize: 12, color: '#3f3b3b'}}>STELLAR</Text>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Candlestick width={134} height={60} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={{color: '#010101', fontSize: 14}}>
                  <FontAwesome6 name="euro-sign" size={12} color="#010101" />
                  0.72
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#010101', fontSize: 14}}>+0.11%</Text>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
      <View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 18,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Text style={{fontSize: 20, color: '#010101'}}>MARKET</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setExpandMore(!expandMore)}>
              <Text
                style={{color: '#3f3b3b', fontSize: 12, alignSelf: 'baseline'}}>
                LAST WEEK
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={18}
                color="#3f3b3b"
              />
            </TouchableOpacity>
            {expandMore && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  transform: 'translateY(30%)',
                  zIndex: 1,
                  width: 130,
                  backgroundColor: '#EFF3F4',
                  borderWidth: 1,
                  borderColor: '#fff',
                  padding: 10,
                  borderRadius: 12,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 1,
                    borderColor: '#fff',
                  }}>
                  <Text style={{color: '#3f3b3b'}}>LAST MONTH</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical: 10}}>
                  <Text style={{color: '#3f3b3b'}}>LAST 3 MOTNH</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Tab section */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <LinearGradient
          colors={
            isTabActive === 'assets'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'assets' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('assets')}>
            <Text
              style={{
                color: isTabActive === 'assets' ? '#010101' : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              ASSETS
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            isTabActive === 'tradable'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'tradable' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('tradable')}>
            <Text
              style={{
                color: isTabActive === 'tradable' ? '#010101' : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              TRADABLE
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            isTabActive === 'new'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'new' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('new')}>
            <Text
              style={{
                color: isTabActive === 'new' ? '#010101' : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              NEWLY LISTED
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Tab container */}
      <ScrollView
        style={{
          marginTop: 16,
          height: responsiveHeight(10),
          overflow: 'hidden',
        }}>
        {isTabActive === 'assets' && <AssetsList />}
        {isTabActive === 'tradable' && <TradableList />}
        {isTabActive === 'new' && <NewListed />}
      </ScrollView>
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6f8fa',
  },
  topSectionTitle: {
    fontSize: 22,
    color: '#010101',
    letterSpacing: 3,
  },
  cardWrapper: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 10,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  incomeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    borderColor: '#3a4156',
    borderWidth: 1,
  },

  arrowIcon: {
    width: 26,
    height: 26,
    backgroundColor: '#a7b3f5',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBtn: {
    position: 'relative',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifyBtn: {
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  tabContainer: {
    backgroundColor: '#484848',
    width: 200,
    height: 44,
    flexDirection: 'row',
    borderRadius: 16,
  },
  tabBtn: {
    height: 44,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    color: '#6b6b6b',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifyBadge: {
    position: 'absolute',
    backgroundColor: '#EA955B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 18,
    width: 18,
    right: -12,
    top: -9,
  },
  notifyBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 5,
  },
  btcamount: {
    color: '#A0A0A0',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  availabeText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 5,
  },
  cardContainer: {
    backgroundColor: '#171F38',
    height: 220,
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D3E3FD',
    borderRadius: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
  },
  cardExpDate: {
    color: '#fff',
    fontSize: 16,
  },
  cardExpiration: {
    color: '#C6C4C3',
    fontSize: 14,
  },
});

export default MarketDuplicate;
