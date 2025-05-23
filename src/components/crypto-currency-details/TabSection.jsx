import React, {memo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '../../theme/ThemeContext';

const TabSection = memo(({isTab, setIsTab}) => {
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        zIndex: 1,
      }}>
      <TouchableOpacity
        onPress={() => setIsTab('1m')}
        style={[
          isTab === '1m' && styles.activeTab,
          {
            backgroundColor:
              isTab === '1m'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          1M
        </Text>
        {isTab === '1m' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('5m')}
        style={[
          isTab === '5m' && styles.activeTab,
          {
            backgroundColor:
              isTab === '5m'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          5M
        </Text>
        {isTab === '5m' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('30m')}
        style={[
          isTab === '30m' && styles.activeTab,
          {
            backgroundColor:
              isTab === '30m'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          30M
        </Text>
        {isTab === '30m' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('1h')}
        style={[
          isTab === '1h' && styles.activeTab,
          {
            backgroundColor:
              isTab === '1h'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          1H
        </Text>
        {isTab === '1h' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('4h')}
        style={[
          isTab === '4h' && styles.activeTab,
          {
            backgroundColor:
              isTab === '4h'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          4H
        </Text>
        {isTab === '4h' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('1d')}
        style={[
          isTab === '1d' && styles.activeTab,
          {
            backgroundColor:
              isTab === '1d'
                ? darkMode
                  ? '#373737'
                  : '#e9ecef'
                : 'transparent',
          },
          ,
        ]}>
        <Text style={[styles.tabName, {color: darkMode ? '#B3B3B3' : '#000'}]}>
          1D
        </Text>
        {isTab === '1d' && (
          <>
            <View
              style={[
                styles.activeTabIndicator,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
            <View
              style={[
                styles.activeTabIndicator2,
                {backgroundColor: darkMode ? '#373737' : '#e9ecef'},
              ]}></View>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setIsOpen(!isOpen);
        }}
        style={{
          position: 'relative',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={darkMode ? '#B3B3B3' : '#3b3c3c'}
        />
        {isOpen && (
          <View
            style={[
              styles.moreTabContainer,
              {
                backgroundColor: darkMode ? '#373737' : '#e9ecef',
                borderColor: darkMode ? '#666666' : '#e9ecef',
              },
            ]}>
            <TouchableOpacity onPress={() => setIsTab('7d')}>
              <Text
                style={[
                  styles.tabName,
                  {
                    color: darkMode ? '#B3B3B3' : '#3b3c3c',
                    borderBottomWidth: 1,
                    borderColor: darkMode ? '#666666' : '#3b3c3c',
                  },
                ]}>
                7D
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTab('14d')}>
              <Text
                style={[
                  styles.tabName,
                  {color: darkMode ? '#B3B3B3' : '#3b3c3c'},
                ]}>
                14D
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  tabName: {
    fontSize: 14,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeTab: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeTabIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    right: -5,
    zIndex: 1,
    borderBottomRightRadius: 20,
  },
  activeTabIndicator2: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    left: -5,
    zIndex: 1,
    borderBottomLeftRadius: 20,
  },
  moreTabContainer: {
    position: 'absolute',
    width: 80,
    borderRadius: 8,
    top: 0,
    right: 0,
    transform: [{translateY: '50%'}],
    borderWidth: 1,
    zIndex: 999,
  },
});
export default TabSection;
