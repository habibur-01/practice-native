import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../theme/ThemeContext';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const MarketTabSection = memo(({isTabActive, setIsTabActive}) => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <LinearGradient
          colors={
            darkMode
              ? isTabActive === 'assets'
                ? ['#5A5A5A', '#6D6D6D', '#6F6F6F']
                : ['transparent', 'transparent', 'transparent']
              : isTabActive === 'assets'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'assets' ? 1 : 0,
              borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('assets')}>
            <Text
              style={{
                color: darkMode
                  ? isTabActive === 'assets'
                    ? '#fff'
                    : '#E0E0E0'
                  : isTabActive === 'assets'
                  ? '#010101'
                  : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              ASSETS
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            darkMode
              ? isTabActive === 'tradable'
                ? ['#5A5A5A', '#6D6D6D', '#6F6F6F']
                : ['transparent', 'transparent', 'transparent']
              : isTabActive === 'tradable'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'tradable' ? 1 : 0,
              borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('tradable')}>
            <Text
              style={{
                color: darkMode
                  ? isTabActive === 'tradable'
                    ? '#fff'
                    : '#E0E0E0'
                  : isTabActive === 'tradable'
                  ? '#010101'
                  : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              TRADABLE
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            darkMode
              ? isTabActive === 'new'
                ? ['#5A5A5A', '#6D6D6D', '#6F6F6F']
                : ['transparent', 'transparent', 'transparent']
              : isTabActive === 'new'
              ? ['#ffffff', '#fff', '#fff']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'new' ? 1 : 0,
              borderColor: darkMode ? '#7B7B7B' : '#d4d4d4',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('new')}>
            <Text
              style={{
                color: darkMode
                  ? isTabActive === 'new'
                    ? '#fff'
                    : '#E0E0E0'
                  : isTabActive === 'new'
                  ? '#010101'
                  : '#353739',
                fontSize: responsiveFontSize(1.7),
              }}>
              NEWLY LISTED
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
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

export default MarketTabSection;
