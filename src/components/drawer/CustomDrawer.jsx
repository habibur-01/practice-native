import React, {useState} from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
// import TopProfileBalance from './TopProfileBalance';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DrawerMenuItems from './DrawerMenuItems';
import {useTheme} from '../../theme/ThemeContext';

const CustomDrawer = props => {
  const {theme, themeMode, setThemeMode} = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    setIsEnabled(previousState => !previousState);
    const newTheme = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View>
          <Image
            source={require('../../assets/images/user.jpg')}
            resizeMode="contain"
            style={styles.userImage}
          />
        </View>
        <View>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
            Alex Peterson
          </Text>
          <Text style={{color: '#d4d4d4', fontSize: 14}}>
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
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          marginTop: 10,
          marginHorizontal: 14,
          borderRadius: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
          <View
            style={{
              backgroundColor: '#ec4',
              width: 28,
              height: 28,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MaterialIcons name="dark-mode" size={20} color="black" />
          </View>
          <Text style={{color: theme.text}}>Dark Mode</Text>
        </View>
        <Switch
          trackColor={{false: '#767577', true: '#fff'}}
          thumbColor={isEnabled ? '#0081F1' : '#f4f3f4'}
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
    backgroundColor: '#232323',
    paddingVertical: 20,

    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  drawerMenuItems: {
    flexGrow: 1,
  },
  userInfo: {
    backgroundColor: '#202536',
    marginHorizontal: 14,
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
