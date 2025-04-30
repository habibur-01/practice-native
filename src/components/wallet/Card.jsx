import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {DataType} from '../data/data';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../theme/ThemeContext';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const Card = ({
  newData,
  setNewData,
  maxVisibleItems,
  item,
  index,
  dataLength,
  animatedValue,
  currentIndex,
  setCurrentIndex,
}) => {
  const {width} = useWindowDimensions();
  const translateX = useSharedValue(0);
  const direction = useSharedValue(0);
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  const pan = Gesture.Pan()
    .onUpdate(e => {
      // e.translationX is the distance of the swipe
      // e.translationX is positive if the swipe is to the right
      // isSwipeRight is true if the swipe is to the right
      const isSwipeRight = e.translationX > 0;

      // direction 1 is right, -1 is left
      direction.value = isSwipeRight ? 1 : -1;

      // If the current index is the same as the index of the card
      if (currentIndex === index) {
        translateX.value = e.translationX;
        animatedValue.value = interpolate(
          Math.abs(e.translationX),
          [0, width],
          [index, index + 1],
        );
      }
    })
    .onEnd(e => {
      if (currentIndex === index) {
        // If the swipe distance is greater than 150 or the swipe velocity is greater than 1000
        // go to the next card
        if (Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000) {
          translateX.value = withTiming(width * direction.value, {}, () => {
            runOnJS(setNewData)([...newData, newData[currentIndex]]);
            runOnJS(setCurrentIndex)(currentIndex + 1);
          });
          animatedValue.value = withTiming(currentIndex + 1);
          // If the swipe distance is less than 150 or the swipe velocity is less than 1000
          // go back to the original position
        } else {
          translateX.value = withTiming(0, {duration: 500});
          animatedValue.value = withTiming(currentIndex, {duration: 500});
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index],
      [-15, 0],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index],
      [0.9, 1],
    );

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0, width],
      [0, 20],
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItems,
      [index, index + 1],
      [0, 1],
    );

    return {
      transform: [
        {translateY: currentItem ? 0 : translateY},
        {scale: currentItem ? 1 : scale},
        {translateX: translateX.value},
        {
          rotateZ: currentItem ? `${direction.value * rotateZ}deg` : '0deg',
        },
      ],
      opacity: index < currentIndex + maxVisibleItems ? 1 : opacity,
    };
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.container, {zIndex: dataLength - index}, animatedStyle]}>
        <LinearGradient
          colors={
            darkMode
              ? ['#A9A9A7', '#A8A6A4', '#9E9C9A', '#939190']
              : ['#232526', '#414345']
          }
          start={{x: 0, y: darkMode ? 0 : 1}}
          end={{x: darkMode ? 0 : 1, y: darkMode ? 1 : 0}}
          style={[
            {
              borderWidth: darkMode ? 1 : 0,
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderColor: '#D4D4D4',
              borderRadius: 20,
              padding: 20,
              height: '100%',
            },
          ]}>
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
              <Text style={styles.cardTitlte}>
                {item?.cardHolder || 'CRYFORGE'}
              </Text>
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
                size={21}
                color={darkMode ? '#F8F6F4' : '#fff'}
              />
              <Entypo
                name="dots-two-horizontal"
                size={21}
                color={darkMode ? '#F8F6F4' : '#fff'}
              />
            </View>
            <View style={{flexDirection: 'row', gap: 0}}>
              <Entypo
                name="dots-two-horizontal"
                size={21}
                color={darkMode ? '#F8F6F4' : '#fff'}
              />
              <Entypo
                name="dots-two-horizontal"
                size={21}
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
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Entypo
                  name="dots-three-horizontal"
                  size={21}
                  color="#F8F6F4"
                />
                <FontAwesome name="lock" size={10} color="#F8F6F4" />
              </View>
              <Text
                style={{
                  color: darkMode ? '#C6C4C3' : '#EFF3F4',
                  fontSize: 14,
                }}>
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
      </Animated.View>
    </GestureDetector>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: responsiveHeight(24),
  },

  image: {
    width: 50,
    // height: 60,
  },
  cardTitlte: {
    color: '#fff',
    fontSize: responsiveFontSize(2.2),
    letterSpacing: 3,
  },
  cardNumber: {
    color: '#fff',
    fontSize: responsiveFontSize(2.8),
  },
  cardExpDate: {
    color: '#fff',
    fontSize: responsiveFontSize(1.9),
  },
  cardExpiration: {
    fontSize: responsiveFontSize(1.6),
  },
});
