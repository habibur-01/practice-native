import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const TabSection = memo(({isTab, setIsTab}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
      }}>
      <TouchableOpacity onPress={() => setIsTab('1m')}>
        <Text style={styles.tabName}>1M</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsTab('5m')}>
        <Text style={styles.tabName}>5M</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setIsTab('30m')}
        style={styles.activeTab}>
        <Text style={styles.tabName}>30M</Text>
        <View style={styles.activeTabIndicator}></View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsTab('1h')}>
        <Text style={styles.tabName}>1H</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsTab('4h')}>
        <Text style={styles.tabName}>4H</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsTab('1d')}>
        <Text style={styles.tabName}>1D</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsTab('more')} style={styles.tabName}>
        <Entypo name="dots-three-horizontal" size={24} color="#B3B3B3" />
      </TouchableOpacity>
    </View>
  );
});
const styles = StyleSheet.create({
  tabName: {
    color: '#B3B3B3',
    fontSize: 16,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  activeTab: {
    position: 'relative',
    backgroundColor: '#373737',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
});
export default TabSection;
