import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PurchaseList from '../../components/wallet/PurchaseList';
import AllListItem from '../../components/wallet/AllListItem';
import DepositList from '../../components/wallet/DepositList';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeContext';
// import {responsiveHeight} from 'react-native-responsive-dimensions';

const WalletScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('cards');
  const [isTabActive, setIsTabActive] = useState('all');
  const {theme} = useTheme();
  console.log('🚀 ~ WalletScreen ~ theme:', theme);

  return (
    <LinearGradient
      colors={[
        '#585858',
        '#4F4F4F',
        // '#37393b',
        // '#282828',
        // '#2B2B2B',
        // '#242424',
        // '#262626',
        '#1e1e1e',
        '#262626',
        '#161616',
      ]}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={() => console.log('pressed')}
          style={styles.scannerBtn}>
          <MaterialCommunityIcons
            name="credit-card-scan-outline"
            size={26}
            color="#A0A0A0"
          />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <LinearGradient
            colors={
              activeTab === 'tokens'
                ? ['#616161', '#7A7A7A', '#7A7A7A']
                : ['#484848', '#484847', '#484848']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tabBtn,
              {borderTopLeftRadius: 16, borderBottomLeftRadius: 16},
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('tokens')}>
              <Text
                style={{color: activeTab === 'tokens' ? '#fff' : '#A0A0A0'}}>
                TOKENS
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              activeTab === 'cards'
                ? ['#616161', '#7A7A7A', '#7A7A7A']
                : ['#484848', '#484847', '#484848']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tabBtn,
              {
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
              },
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('cards')}>
              <Text style={{color: activeTab === 'cards' ? '#fff' : '#A0A0A0'}}>
                CARDS
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <LinearGradient
          colors={['#5C5C5C', '#6B6764', '#8E7C70', '#948275']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{borderRadius: 10}}>
          <TouchableOpacity
            onPress={() => console.log('notify')}
            style={styles.notifyBtn}>
            <Ionicons name="notifications-sharp" size={24} color="#CAB9AD" />
            <View style={styles.notifyBadge}>
              <Text style={styles.notifyBadgeText}>6</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <View style={{marginVertical: 30}}>
        <View style={styles.amountContainer}>
          <FontAwesome name="euro" size={22} color="#fff" />
          <Text style={styles.amount}>5760.30</Text>
          <Text style={styles.btcamount}>~ 0.087952 BTC</Text>
        </View>
        <Text style={styles.availabeText}> AVAILABLE BALANCE</Text>
      </View>

      {/* Card section */}
      <View>
        <LinearGradient
          colors={['#A9A9A7', '#A8A6A4', '#9E9C9A', '#939190']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/images/cryforge.png')}
              resizeMode="contain"
              style={styles.image}
            />
            <Ionicons name="settings-sharp" size={20} color="#E1DFDE" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.cardNumber}>5500</Text>
            <View style={{flexDirection: 'row', gap: 0}}>
              <Entypo name="dots-two-horizontal" size={22} color="#F8F6F4" />
              <Entypo name="dots-two-horizontal" size={22} color="#F8F6F4" />
            </View>
            <View style={{flexDirection: 'row', gap: 0}}>
              <Entypo name="dots-two-horizontal" size={22} color="#F8F6F4" />
              <Entypo name="dots-two-horizontal" size={22} color="#F8F6F4" />
            </View>
            {/* <Text style={[styles.cardNumber]}>. . . .</Text> */}
            <Text style={styles.cardNumber}>2024</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={styles.cardExpDate}>11 / 28</Text>
              <Text style={styles.cardExpiration}>EXPIRATION DATE</Text>
            </View>
            <View>
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Entypo
                  name="dots-three-horizontal"
                  size={22}
                  color="#F8F6F4"
                />
                <FontAwesome name="lock" size={10} color="#F8F6F4" />
              </View>
              <Text style={{color: '#C6C4C3', fontSize: 14}}>CVV</Text>
            </View>
            <View>
              <Image
                source={require('../../assets/images/mastercard.png')}
                resizeMode="contain"
                style={{width: 60, height: 60}}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={{marginVertical: 20, flexDirection: 'row', gap: 10}}>
        <LinearGradient
          colors={['#515353', '#4C4C4C']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.incomeBtn}>
          <View style={styles.arrowIcon}>
            <Feather name="arrow-down-left" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text style={{color: '#FFF', fontSize: 16}}>
              <FontAwesome name="euro" size={15} color="#fff" />
              36 850.01
            </Text>
            <Text style={{color: '#C6C4C3', fontSize: 13}}>INCOME</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#515353', '#4C4C4C']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.incomeBtn}>
          <View style={styles.arrowIcon}>
            <Feather name="arrow-up-right" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text style={{color: '#FFF', fontSize: 16}}>
              <FontAwesome name="euro" size={15} color="#fff" />
              7200.48
            </Text>
            <Text style={{color: '#C6C4C3', fontSize: 13}}>WITHDRAWAL</Text>
          </View>
        </LinearGradient>
      </View>
      <View style={{flexDirection: 'row'}}>
        <LinearGradient
          colors={
            isTabActive === 'all'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'all' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('all')}>
            <Text
              style={{
                color: isTabActive === 'all' ? '#fff' : '#E0E0E0',
                fontSize: responsiveFontSize(1.6),
              }}>
              ALL
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            isTabActive === 'purchases'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'purchases' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('purchases')}>
            <Text
              style={{
                color: isTabActive === 'purchases' ? '#fff' : '#E0E0E0',
                fontSize: responsiveFontSize(1.6),
              }}>
              PURCHASES
            </Text>
          </TouchableOpacity>
        </LinearGradient>
        <LinearGradient
          colors={
            isTabActive === 'deposit'
              ? ['#4E4E4E', '#5B5B5B', '#656565']
              : ['transparent', 'transparent', 'transparent']
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'deposit' ? 1 : 0,
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('deposit')}>
            <Text
              style={{
                color: isTabActive === 'deposit' ? '#fff' : '#E0E0E0',
                fontSize: responsiveFontSize(1.6),
              }}>
              DEPOSIT
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <ScrollView
        style={{
          marginTop: 10,
          height: responsiveHeight(10),
          overflow: 'hidden',
        }}>
        {isTabActive === 'all' && <AllListItem />}
        {isTabActive === 'purchases' && <PurchaseList />}
        {isTabActive === 'deposit' && <DepositList />}
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7B7B7B',
  },
  incomeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#7B7B7B',
    borderRadius: 20,
  },

  arrowIcon: {
    width: 26,
    height: 26,
    backgroundColor: '#CCCCCC',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBtn: {
    position: 'relative',
    backgroundColor: '#717171',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A0A0A0',
  },
  notifyBtn: {
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A0A0A0',
  },
  tabContainer: {
    backgroundColor: '#484848',
    width: 200,
    height: 44,
    flexDirection: 'row',
    borderRadius: 16,
  },
  tabBtn: {
    height: 44,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    color: '#6b6b6b',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notifyBadge: {
    position: 'absolute',
    backgroundColor: '#EA955B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 18,
    width: 18,
    right: -12,
    top: -9,
  },
  notifyBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 24,
    color: '#fff',
    marginLeft: 5,
  },
  btcamount: {
    color: '#A0A0A0',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  availabeText: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 5,
  },
  cardContainer: {
    height: responsiveHeight(24),
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    borderRadius: 20,
  },
  image: {
    width: 150,
    // height: 60,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
  },
  cardExpDate: {
    color: '#fff',
    fontSize: 16,
  },
  cardExpiration: {
    color: '#C6C4C3',
    fontSize: 14,
  },
});

export default WalletScreen;
