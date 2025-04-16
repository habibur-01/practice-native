import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
// import TopProfileBalance from './TopProfileBalance';
import DrawerMenuItems from './DrawerMenuItems';

export default function CustomDrawer(props) {
  return (
    <View style={styles.container}>
      {/* drawer menu items for navigate  */}
      <View>
        <DrawerMenuItems />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#202536',
    backgroundColor: '#232323',

    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
});
