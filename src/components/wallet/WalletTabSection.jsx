import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeContext';

const WalletTabSection = memo(({isTabActive, setIsTabActive}) => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  return (
    <View style={{flexDirection: 'row', marginTop: responsiveHeight(1.5)}}>
      <LinearGradient
        colors={
          darkMode
            ? isTabActive === 'all'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
            : isTabActive === 'all'
            ? ['#ffffff', '#ffffff']
            : ['transparent', 'transparent']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.tab,
          {
            borderWidth: isTabActive === 'all' ? 1 : 0,
            borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
          },
        ]}>
        <TouchableOpacity onPress={() => setIsTabActive('all')}>
          <Text
            style={{
              color: darkMode
                ? isTabActive === 'all'
                  ? '#fff'
                  : '#E0E0E0'
                : isTabActive === 'all'
                ? '#010101'
                : '#353739',
              fontSize: responsiveFontSize(1.6),
            }}>
            ALL
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={
          darkMode
            ? isTabActive === 'purchases'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
            : isTabActive === 'purchases'
            ? ['#ffffff', '#ffffff']
            : ['transparent', 'transparent']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.tab,
          {
            borderWidth: isTabActive === 'purchases' ? 1 : 0,
            borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
          },
        ]}>
        <TouchableOpacity onPress={() => setIsTabActive('purchases')}>
          <Text
            style={{
              color: darkMode
                ? isTabActive === 'purchases'
                  ? '#fff'
                  : '#E0E0E0'
                : isTabActive === 'purchases'
                ? '#010101'
                : '#353739',
              fontSize: responsiveFontSize(1.6),
            }}>
            PURCHASES
          </Text>
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={
          darkMode
            ? isTabActive === 'deposit'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
            : isTabActive === 'deposit'
            ? ['#ffffff', '#ffffff']
            : ['transparent', 'transparent']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.tab,
          {
            borderWidth: isTabActive === 'deposit' ? 1 : 0,
            borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
          },
        ]}>
        <TouchableOpacity onPress={() => setIsTabActive('deposit')}>
          <Text
            style={{
              color: darkMode
                ? isTabActive === 'deposit'
                  ? '#fff'
                  : '#E0E0E0'
                : isTabActive === 'deposit'
                ? '#010101'
                : '#353739',
              fontSize: responsiveFontSize(1.6),
            }}>
            DEPOSIT
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
});
const styles = StyleSheet.create({
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WalletTabSection;
