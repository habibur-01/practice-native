import React, {useState} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
// import TopProfileBalance from './TopProfileBalance';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DrawerMenuItems from './DrawerMenuItems';
import {useTheme} from '../../theme/ThemeContext';

const CustomDrawer = props => {
  const {theme, themeMode, setThemeMode} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const darkMode = themeMode === 'dark' ? true : false;
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: darkMode ? '#4F4F4F' : '#fff'},
      ]}>
      <View
        style={[
          styles.userInfo,
          {backgroundColor: darkMode ? '#424040' : '#eef0f4'},
        ]}>
        <View>
          <Image
            source={require('../../assets/images/user.jpg')}
            resizeMode="contain"
            style={styles.userImage}
          />
        </View>
        <View>
          <Text
            style={{
              color: darkMode ? '#fff' : '#010101',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Alex Peterson
          </Text>
          <Text style={{color: darkMode ? '#d4d4d4' : '#494949', fontSize: 14}}>
            alexpeter34@gmail.com
          </Text>
        </View>
      </View>
      {/* drawer menu items for navigate  */}
      <View style={styles.drawerMenuItems}>
        <DrawerMenuItems />
      </View>
      <View
        style={{
          backgroundColor: darkMode ? '#424040' : '#eef0f4',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 12,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View
            style={{
              backgroundColor: darkMode ? 'rgba(94, 92, 92, 0.9)' : '#d5dde2',
              width: 28,
              height: 28,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {isEnabled ? (
              <Entypo name="light-down" size={24} color="#3b3c3c" />
            ) : (
              <MaterialIcons name="dark-mode" size={18} color="#fff" />
            )}
          </View>
          <Text style={{color: darkMode ? '#fff' : '#010101'}}>
            {isEnabled ? 'Light Mode' : 'Dark Mode'}
          </Text>
        </View>
        <Switch
          trackColor={{false: 'gray', true: '#a0a0a0'}}
          thumbColor={isEnabled ? '#6940D0' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#202536',
    backgroundColor: '#4F4F4F',
    paddingVertical: 20,

    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  drawerMenuItems: {
    flexGrow: 1,
  },
  userInfo: {
    // backgroundColor: '#424040',
    marginHorizontal: 14,
    marginBottom: 8,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
});
export default CustomDrawer;
