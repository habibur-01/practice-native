import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CardSection = memo(() => {
  const {theme, themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  return (
    <View>
      <LinearGradient
        colors={
          darkMode
            ? ['#A9A9A7', '#A8A6A4', '#9E9C9A', '#939190']
            : ['#9bbbfb', '#a8c8ff', '#6677fd']
        }
        start={{x: 0, y: darkMode ? 0 : 1}}
        end={{x: darkMode ? 0 : 1, y: darkMode ? 1 : 0}}
        style={[styles.cardContainer, {borderWidth: darkMode ? 1 : 0}]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Image
              source={require('../../assets/images/card-logo.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={styles.cardTitlte}>CRYFORGE</Text>
          </View>
          <Ionicons
            name="settings-sharp"
            size={20}
            color={darkMode ? '#E1DFDE' : '#ffffff'}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.cardNumber}>5500</Text>
          <View style={{flexDirection: 'row', gap: 0}}>
            <Entypo
              name="dots-two-horizontal"
              size={22}
              color={darkMode ? '#F8F6F4' : '#fff'}
            />
            <Entypo
              name="dots-two-horizontal"
              size={22}
              color={darkMode ? '#F8F6F4' : '#fff'}
            />
          </View>
          <View style={{flexDirection: 'row', gap: 0}}>
            <Entypo
              name="dots-two-horizontal"
              size={22}
              color={darkMode ? '#F8F6F4' : '#fff'}
            />
            <Entypo
              name="dots-two-horizontal"
              size={22}
              color={darkMode ? '#F8F6F4' : '#fff'}
            />
          </View>
          {/* <Text style={[styles.cardNumber]}>. . . .</Text> */}
          <Text style={styles.cardNumber}>2024</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.cardExpDate}>11 / 28</Text>
            <Text
              style={[
                styles.cardExpiration,
                {color: darkMode ? '#C6C4C3' : '#EFF3F4'},
              ]}>
              EXPIRATION DATE
            </Text>
          </View>
          <View>
            <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
              <Entypo name="dots-three-horizontal" size={22} color="#F8F6F4" />
              <FontAwesome name="lock" size={10} color="#F8F6F4" />
            </View>
            <Text
              style={{color: darkMode ? '#C6C4C3' : '#EFF3F4', fontSize: 14}}>
              CVV
            </Text>
          </View>
          <View>
            <Image
              source={require('../../assets/images/mastercard.png')}
              resizeMode="contain"
              style={{width: 60, height: 60}}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});
const styles = StyleSheet.create({
  cardContainer: {
    height: responsiveHeight(24),
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: '#D4D4D4',
    borderRadius: 20,
  },
  image: {
    width: 50,
    // height: 60,
  },
  cardTitlte: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 3,
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
    fontSize: 14,
  },
});

export default CardSection;
