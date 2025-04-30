import React, {memo} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Candlestick from './CandleSticks';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../theme/ThemeContext';

const CurrencyCard = memo(({expandGainers, setExpandGainers}) => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  return (
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
          <Text style={{fontSize: 20, color: darkMode ? '#F6F6F6' : '#010101'}}>
            ASSETS
          </Text>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}
            onPress={() => setExpandGainers(!expandGainers)}>
            <Text
              style={{color: darkMode ? '#E0E0E0' : '#3f3b3b', fontSize: 11}}>
              GAINERS
            </Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={16}
              color={darkMode ? '#DADADA' : '#3f3b3b'}
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
                backgroundColor: darkMode ? '#484848' : '#EFF3F4',
                borderWidth: 1,
                borderColor: darkMode ? '#7A7A7A' : '#dee1e8',
                padding: 10,
                borderRadius: 12,
              }}>
              <TouchableOpacity>
                <Text
                  style={{
                    color: darkMode ? '#F6F6F6' : '#3f3b3b',
                    fontSize: 12,
                  }}>
                  All
                </Text>
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
          colors={
            darkMode
              ? ['#666666', '#5F5F5F', '#3d3c3c']
              : ['#ffffff', '#ffffff', '#ffffff']
          }
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: responsiveWidth(43),
            height: responsiveHeight(18),
            borderRadius: 20,
            borderWidth: 1,
            borderColor: darkMode ? '#7B7B7B' : '#e8e9ea',
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
              source={
                darkMode
                  ? require('../../assets/icon/stellar.png')
                  : require('../../assets/icon/stellar-black.png')
              }
              resizeMode="cover"
              style={{width: 36, height: 36}}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: darkMode ? '#E8E8E8' : '#010101',
                  fontWeight: 'bold',
                }}>
                XLM
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: darkMode ? '#B4B4B4' : '#3f3b3b',
                }}>
                STELLAR
              </Text>
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
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                <FontAwesome6
                  name="euro-sign"
                  size={12}
                  color={darkMode ? '#F6F6F6' : '#010101'}
                />
                0.16
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                +6.49%
              </Text>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={
            darkMode
              ? ['#666666', '#5F5F5F', '#3d3c3c']
              : ['#ffffff', '#ffffff', '#ffffff']
          }
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: responsiveWidth(43),
            height: responsiveHeight(18),
            borderRadius: 20,
            borderWidth: 1,
            borderColor: darkMode ? '#7B7B7B' : '#e8e9ea',
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
              source={
                darkMode
                  ? require('../../assets/icon/safepal.png')
                  : require('../../assets/icon/sfp-light.png')
              }
              resizeMode="cover"
              style={{width: 36, height: 36}}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: darkMode ? '#E8E8E8' : '#010101',
                  fontWeight: 'bold',
                }}>
                SFP
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: darkMode ? '#B4B4B4' : '#3f3b3b',
                }}>
                SAFEPAL
              </Text>
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
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                <FontAwesome6
                  name="euro-sign"
                  size={12}
                  color={darkMode ? '#F6F6F6' : '#010101'}
                />
                0.72
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                +0.11%
              </Text>
            </View>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={
            darkMode
              ? ['#666666', '#5F5F5F', '#3d3c3c']
              : ['#ffffff', '#ffffff', '#ffffff']
          }
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={{
            width: responsiveWidth(43),
            height: responsiveHeight(18),
            borderRadius: 20,
            borderWidth: 1,
            borderColor: darkMode ? '#7B7B7B' : '#e8e9ea',
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
              source={
                darkMode
                  ? require('../../assets/icon/stellar.png')
                  : require('../../assets/icon/stellar-black.png')
              }
              resizeMode="cover"
              style={{width: 36, height: 36}}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  color: darkMode ? '#E8E8E8' : '#010101',
                  fontWeight: 'bold',
                }}>
                XLM
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: darkMode ? '#B4B4B4' : '#3f3b3b',
                }}>
                STELLAR
              </Text>
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
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                <FontAwesome6
                  name="euro-sign"
                  size={12}
                  color={darkMode ? '#F6F6F6' : '#010101'}
                />
                0.72
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: darkMode ? '#F6F6F6' : '#010101',
                  fontSize: 14,
                }}>
                +0.11%
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
});
const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default CurrencyCard;
