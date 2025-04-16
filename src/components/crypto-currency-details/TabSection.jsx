import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const TabSection = memo(({isTab, setIsTab}) => {
  console.log('🚀 ~ TabSection ~ isTab:', isTab);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
      }}>
      <TouchableOpacity
        onPress={() => setIsTab('1m')}
        style={isTab === '1m' && styles.activeTab}>
        <Text style={styles.tabName}>1M</Text>
        {isTab === '1m' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('5m')}
        style={[isTab === '5m' && styles.activeTab]}>
        <Text style={styles.tabName}>5M</Text>
        {isTab === '5m' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('30m')}
        style={isTab === '30m' && styles.activeTab}>
        <Text style={styles.tabName}>30M</Text>
        {isTab === '30m' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('1h')}
        style={isTab === '1h' && styles.activeTab}>
        <Text style={styles.tabName}>1H</Text>
        {isTab === '1h' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('4h')}
        style={isTab === '4h' && styles.activeTab}>
        <Text style={styles.tabName}>4H</Text>
        {isTab === '4h' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('1d')}
        style={isTab === '1d' && styles.activeTab}>
        <Text style={styles.tabName}>1D</Text>
        {isTab === '1d' && (
          <>
            <View style={styles.activeTabIndicator}></View>
            <View style={styles.activeTabIndicator2}></View>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('more')}
        style={{
          position: 'relative',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}>
        <Entypo name="dots-three-horizontal" size={20} color="#B3B3B3" />
        {isTab === 'more' && (
          <View style={styles.moreTabContainer}>
            <TouchableOpacity
              onPress={() => setIsTab('1d')}
              style={isTab === '1d' && styles.activeTab}>
              <Text style={styles.tabName}>7D</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsTab('1d')}
              style={[
                isTab === '1d' && styles.activeTab,
                {position: 'relative'},
              ]}>
              <Text style={styles.tabName}>14D</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  tabName: {
    color: '#B3B3B3',
    fontSize: 14,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  activeTab: {
    backgroundColor: '#373737',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  activeTabIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    right: -5,
    backgroundColor: '#373737',
    zIndex: 1,
    borderBottomRightRadius: 20,
  },
  activeTabIndicator2: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: -10,
    left: -5,
    backgroundColor: '#373737',
    zIndex: 1,
    borderBottomLeftRadius: 20,
  },
  moreTabContainer: {
    position: 'absolute',
    backgroundColor: '#373737',
    width: 80,
    borderRadius: 8,
    top: 0,
    // right: 0,
    transform: [{translateY: '50%'}],
    zIndex: 999,
  },
});
export default TabSection;
