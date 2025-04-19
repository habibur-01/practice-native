import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen
import Dashboard from '../screen/authenticated/Dashboard';
import WalletScreen from '../screen/authenticated/WalletScreen';
import ProfileScreen from '../screen/authenticated/ProfileScreen';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import MarketScreen from '../screen/authenticated/MarketScreen';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Polygon} from 'react-native-svg';
import CryptoCurrencyDetails from '../screen/authenticated/CryptoCurrencyDetails';
import CustomDrawer from '../components/drawer/CustomDrawer';
import Root from './Root';
import {ThemeProvider, useTheme} from '../theme/ThemeContext';
import WalletDuplicate from '../screen/authenticated/WalletDuplicate';
import MarketDuplicate from '../screen/authenticated/MarketDuplicate';

// Create navigator
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
export const DashboardNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
      }}>
      <Drawer.Screen name="DASHBOARD" component={Dashboard} />
      <Drawer.Screen name="CRYPTO_DETAILS" component={CryptoCurrencyDetails} />
      <Drawer.Screen name="WalletDuplicate" component={WalletDuplicate} />
      <Drawer.Screen name="MarketDuplicate" component={MarketDuplicate} />
    </Drawer.Navigator>
  );
};

// Bottom Tab Navigator
export const BottomTabs = () => {
  const {theme, themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  return (
    <View
      style={[
        styles.bottomTabContainer,
        {backgroundColor: darkMode ? '#161616' : '#f6f8fa'},
      ]}>
      <Tab.Navigator
        initialRouteName="WALLET"
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#B4B4B4',

          tabBarStyle: {
            position: 'relative',
            bottom: 20,
            width: '90%',
            backgroundColor: '#2F2F2F',
            borderWidth: 1,
            borderColor: '#3d3c3c',
            height: 68,
            borderRadius: 20,
            paddingTop: 12,
            margin: 'auto',
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="MARKET"
          component={MarketScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <View>
                  {focused ? (
                    <LinearGradient
                      colors={['transparent', 'transparent']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.8,
                        // iOS Shadow
                        shadowColor: '#f77f2e',
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 12,

                        // Android Shadow
                        elevation: 12,
                      }}>
                      <BlurView
                        style={styles.blurContainer}
                        blurType="light"
                        blurAmount={30}
                        reducedTransparencyFallbackColor="red">
                        <FontAwesome5 name="wallet" size={24} color={'#fff'} />
                      </BlurView>
                    </LinearGradient>
                  ) : (
                    <FontAwesome5 name="bitcoin" size={24} color={'#B4B4B4'} />
                  )}

                  {focused && (
                    <View style={styles.activeBorder}>
                      <Text></Text>
                    </View>
                  )}
                </View>
              );
            },
            // tabBarLabel: 'Market',
          }}
        />
        <Tab.Screen
          name="EXCHANGE"
          component={CryptoCurrencyDetails} // Use any screen or a placeholder
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <View style={{marginTop: -34}}>
                <ImageBackground
                  source={require('../assets/images/hexagon.png')}
                  resizeMode="containe"
                  style={{width: 56, height: 56}}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/images/card.png')}
                      resizeMode="contain"
                      style={{width: 28, height: 28}}
                    />
                  </View>
                </ImageBackground>
              </View>
            ),

            // tabBarButton: props => <CustomAddButton {...props} />,
          }}
        />

        <Tab.Screen
          name="WALLET"
          component={WalletScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => {
              return (
                <View style={[focused && styles.activeTabWrapper]}>
                  {focused ? (
                    <LinearGradient
                      colors={['transparent', 'transparent']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.7,
                        // iOS Shadow
                        shadowColor: '#f77f2e',
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 12,

                        // Android Shadow
                        elevation: 12,
                      }}>
                      <BlurView
                        style={styles.blurContainer}
                        blurType="light"
                        blurAmount={30}
                        reducedTransparencyFallbackColor="red">
                        <FontAwesome5 name="wallet" size={24} color={'#fff'} />
                      </BlurView>
                    </LinearGradient>
                  ) : (
                    <FontAwesome5 name="wallet" size={24} color={'#B4B4B4'} />
                  )}

                  {focused && (
                    <View style={styles.activeBorder}>
                      <Text></Text>
                    </View>
                  )}
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flex: 1,
    position: 'relative',
    // backgroundColor: '#161616',
    // backgroundColor: '#242424',
  },
  iconContainer: {
    position: 'absolute',
    transform: [{rotate: '-45deg'}], // Move the icon up
    backgroundColor: '#656565',
    height: 46,
    width: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    top: -28,
  },

  activeBorder: {
    backgroundColor: '#EA955B',
    height: 2,
    width: 40,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    position: 'absolute',
    zIndex: 1,
    top: -16,
    left: -6,
  },
  blurContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default AppNavigator;
