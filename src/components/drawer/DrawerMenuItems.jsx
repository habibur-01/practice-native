import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

// icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
// import {colors} from '../../application/color';

// This is added by hera

export default function DrawerMenuItems() {
  const [activeSubItem, setActiveSubItem] = React.useState('');
  const [expandedItems, setExpandedItems] = React.useState({}); // Track expanded menu items
  const navigation = useNavigation();

  const handleSubItemToggle = item => {
    // If the item is already expanded, collapse it, otherwise expand it
    setActiveSubItem(activeSubItem === item ? '' : item);
    setExpandedItems(prevState => {
      const newState = {...prevState};
      // Collapse all items except the clicked one
      for (const key in newState) {
        if (key !== item) newState[key] = false;
      }
      // Toggle the clicked item
      newState[item] = !newState[item];
      return newState;
    });
  };

  // Array of menu items with subitems
  const menuItems = [
    {
      id: 1,
      title: 'Dashboard',
      icon: (
        <AntDesign name="home" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [],
      onPress: () => {
        navigation.navigate('DASHBOARD');
      },
    },
    {
      id: 2,
      title: 'IB Dashboard',
      icon: (
        <AntDesign name="home" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [],
      onPress: () => {
        navigation.navigate('DASHBOARD');
      },
    },
    {
      id: 3,
      title: 'User Admin',
      icon: (
        <MaterialCommunityIcons
          name="account-outline"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Profile',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Account Verification',
          onPress: () => {
            navigation.navigate('KYC_VERIFICATION');
          },
        },
        {
          title: 'Bank Account',
          onPress: () => {
            navigation.navigate('ADD_BANK');
          },
        },
      ],
    },
    {
      id: 4,
      title: 'IB Admin',
      icon: (
        <MaterialCommunityIcons
          name="account-outline"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Profile Setting',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Verification',
          onPress: () => {
            navigation.navigate('ACCOUNTVERIFICATION');
          },
        },
        {
          title: 'Banking',
          onPress: () => {
            navigation.navigate('ADD_BANK');
          },
        },
      ],
    },
    {
      id: 15,
      title: 'Notifications',
      icon: (
        <Ionicons
          name="notifications-outline"
          size={responsiveFontSize(2.5)}
          color="white"
        />
      ),
      subItems: [],
      onPress: () => {
        navigation.navigate('WalletDuplicate');
      },
    },
    {
      id: 5,
      title: 'Manage Accounts',
      icon: (
        <MaterialCommunityIcons
          name="account-multiple-plus-outline"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Open Live Account',
          onPress: () => {
            navigation.navigate('MarketDuplicate');
          },
        },
        {
          title: 'Account Settings',
          onPress: () => {
            console.log('Account Verification Pressed');
          },
        },
        {
          title: 'Banking',
          onPress: () => {
            console.log('Bank Account Pressed');
          },
        },
      ],
    },
    {
      id: 6,
      title: 'Deposit',
      icon: (
        <AntDesign
          name="creditcard"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Deposit',
          onPress: () => {
            navigation.navigate('DEPOSIT');
          },
        },
      ],
    },
    {
      id: 7,
      title: 'Trader Withdrawal',
      icon: (
        <AntDesign
          name="creditcard"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Withdraw',
          onPress: () => {
            navigation.navigate('TRADER_WITHDRAWAL');
          },
        },
      ],
    },
    {
      id: 8,
      title: 'IB Withdraw',
      icon: (
        <AntDesign
          name="creditcard"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Withdraw',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 9,
      title: 'Transfer',
      icon: (
        <FontAwesome
          name="expand"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'Internal Transfer',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'External Transfer',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 10,
      title: 'IB Transfer',
      icon: (
        <FontAwesome
          name="expand"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'External Transfer',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 11,
      title: 'Trader Reports',
      icon: (
        <AntDesign name="bars" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [
        {
          title: 'Trades',
          onPress: () => {
            navigation.navigate('TRADE_REPORTS');
          },
        },
        {
          title: 'Deposit',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Withdraw',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Internal Transfer',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'External Transfer',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 12,
      title: 'IB Reports',
      icon: (
        <AntDesign name="bars" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [
        {
          title: 'IB Withdraw',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'IB Commission',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Balance Send',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Balance Received',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 12,
      title: 'Affiliate',
      icon: (
        <MaterialCommunityIcons
          name="account-group-outline"
          color="white"
          size={responsiveFontSize(2.5)}
        />
      ),
      subItems: [
        {
          title: 'IB Tree',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'My IB(s)',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'My Clients',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 12,
      title: 'PAMM',
      icon: (
        <Feather name="copy" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [
        {
          title: 'Pamm Profile',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Pamm Registration',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 13,
      title: 'MAMM',
      icon: (
        <Feather name="copy" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [
        {
          title: 'Manage Slave Account',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 13,
      title: 'Copy Trading',
      icon: (
        <Feather name="copy" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [
        {
          title: 'Social Traders Report',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
        {
          title: 'Social Activities Report',
          onPress: () => {
            navigation.navigate('PROFILE');
          },
        },
      ],
    },
    {
      id: 14,
      title: 'Economic Calendar',
      icon: (
        <Fontisto name="date" color="white" size={responsiveFontSize(2.5)} />
      ),
      subItems: [],
      onPress: () => {
        navigation.navigate('Login');
      },
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {menuItems.map((menuItem, index) => (
        <View key={index}>
          {/* Main menu item */}
          <TouchableOpacity
            onPress={() => {
              if (menuItem.onPress) {
                menuItem.onPress();
              } else {
                handleSubItemToggle(menuItem.title);
              }
            }}
            style={styles.menuItem}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {menuItem.icon}
              <Text style={{color: 'white'}}>{menuItem.title}</Text>
            </View>
            <View>
              <AntDesign
                name={
                  menuItem.subItems.length > 0
                    ? expandedItems[menuItem.title]
                      ? 'minus'
                      : 'plus'
                    : 'arrowright'
                }
                color="white"
                size={responsiveFontSize(2.5)}
              />
            </View>
          </TouchableOpacity>

          {/* Subitems */}
          {expandedItems[menuItem.title] && menuItem.subItems.length > 0 && (
            <View style={styles.subItemsContainer}>
              {menuItem.subItems.map((subItem, subIndex) => (
                <TouchableOpacity key={subIndex} onPress={subItem?.onPress}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 10,
                        alignItems: 'center',
                      }}>
                      <Feather
                        name="circle"
                        color="white"
                        size={responsiveFontSize(1.3)}
                      />
                      <Text style={{color: 'white'}}>{subItem.title}</Text>
                    </View>
                    {/* explore icon  */}
                    <View>
                      <AntDesign
                        name="right"
                        color="white"
                        size={responsiveFontSize(1.8)}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: responsiveHeight(70),
    paddingHorizontal: responsiveWidth(3),
  },
  menuItem: {
    backgroundColor: '#424040',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    borderRadius: 10,
    marginTop: responsiveHeight(0.8),
  },
  subItemsContainer: {
    paddingLeft: responsiveWidth(10),
    paddingRight: responsiveWidth(3),
    marginTop: responsiveHeight(1),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: '#161616',
    borderRadius: 10,
    gap: 20,
  },
});
