import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PurchaseList from '../../components/wallet/PurchaseList';
import AllListItem from '../../components/wallet/AllListItem';
import DepositList from '../../components/wallet/DepositList';
import {responsiveHeight} from 'react-native-responsive-dimensions';
// import {responsiveHeight} from 'react-native-responsive-dimensions';

const WalletDuplicate = memo(() => {
  const [activeTab, setActiveTab] = useState('cards');
  const [isTabActive, setIsTabActive] = useState('all');
  return (
    <View style={styles.container}>
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

        {/* top section tab */}
        <View style={styles.tabContainer}>
          <View
            style={[
              styles.tabBtn,
              {
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                backgroundColor: activeTab === 'tokens' ? '#000' : '#fff',
              },
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('tokens')}>
              <Text
                style={{
                  color: activeTab === 'tokens' ? '#fff' : '#000',
                }}>
                TOKENS
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.tabBtn,
              {
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                backgroundColor: activeTab === 'cards' ? '#000' : '#fff',
              },
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('cards')}>
              <Text
                style={{
                  color: activeTab === 'cards' ? '#fff' : '#000',
                }}>
                CARDS
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderRadius: 10}}>
          <TouchableOpacity
            onPress={() => console.log('notify')}
            style={styles.notifyBtn}>
            <Ionicons name="notifications-sharp" size={24} color="#A0A0A0" />
            <View style={styles.notifyBadge}>
              <Text style={styles.notifyBadgeText}>6</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Balance section */}
      <View style={{marginVertical: 30}}>
        <View style={styles.amountContainer}>
          <FontAwesome name="euro" size={22} color="#000" />
          <Text style={styles.amount}>5760.30</Text>
          <Text style={styles.btcamount}>~ 0.087952 BTC</Text>
        </View>
        <Text style={styles.availabeText}> AVAILABLE BALANCE</Text>
      </View>

      {/* Card section */}
      <View>
        <LinearGradient
          colors={['#9bbbfb', '#a8c8ff', '#6677fd']}
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={styles.cardContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Image
                source={require('../../assets/images/card-logo.png')}
                resizeMode="cover"
                style={styles.image}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: '#ffffff',
                  letterSpacing: 2,
                }}>
                CRYFORGE
              </Text>
            </View>
            <Ionicons name="settings-sharp" size={20} color="#ffffff" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={styles.cardNumber}>5500</Text>
            <View style={{flexDirection: 'row', gap: 0}}>
              <Entypo name="dots-two-horizontal" size={22} color="#fff" />
              <Entypo name="dots-two-horizontal" size={22} color="#fff" />
            </View>
            <View style={{flexDirection: 'row', gap: 0}}>
              <Entypo name="dots-two-horizontal" size={22} color="#fff" />
              <Entypo name="dots-two-horizontal" size={22} color="#fff" />
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
                style={{
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                }}>
                <Entypo name="dots-three-horizontal" size={22} color="#fff" />
                <FontAwesome name="lock" size={10} color="#fff" />
              </View>
              <Text style={{color: '#EFF3F4', fontSize: 14}}>CVV</Text>
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
          colors={['#FDFFFF', '#FDFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.incomeBtn}>
          <View style={styles.arrowIcon}>
            <Feather name="arrow-down-left" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text style={{color: '#010101', fontSize: 16}}>
              <FontAwesome name="euro" size={15} color="#010101" />
              36 850.01
            </Text>
            <Text style={{color: '#a0a0a0', fontSize: 13}}>INCOME</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['#FDFFFF', '#FDFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.incomeBtn}>
          <View style={styles.arrowIcon}>
            <Feather name="arrow-up-right" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text style={{color: '#010101', fontSize: 16}}>
              <FontAwesome name="euro" size={15} color="#010101" />
              7200.01
            </Text>
            <Text style={{color: '#A0A0A0', fontSize: 13}}>WITHDRAWAL</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tab section */}
      <View style={{flexDirection: 'row'}}>
        <View
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'all' ? 1 : 0,
              backgroundColor:
                isTabActive === 'all' ? '#ffffff' : 'transparent',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('all')}>
            <Text
              style={{
                color: '#010101',
                fontSize: 15,
              }}>
              ALL
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'purchases' ? 1 : 0,
              backgroundColor:
                isTabActive === 'purchases' ? '#ffffff' : 'transparent',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('purchases')}>
            <Text
              style={{
                color: isTabActive === 'purchases' ? '#010101' : '#353739',
                fontSize: 15,
              }}>
              PURCHASES
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.tab,
            {
              borderWidth: isTabActive === 'deposit' ? 1 : 0,
              backgroundColor:
                isTabActive === 'deposit' ? '#ffffff' : 'transparent',
            },
          ]}>
          <TouchableOpacity onPress={() => setIsTabActive('deposit')}>
            <Text
              style={{
                color: isTabActive === 'deposit' ? '#010101' : '#353739',
                fontSize: 15,
              }}>
              DEPOSIT
            </Text>
          </TouchableOpacity>
        </View>
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
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#D9E2E2',
    backgroundColor: '#f6f8fa',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContainer: {
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

  scannerBtn: {
    position: 'relative',
    backgroundColor: '#EFF3F4',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifyBtn: {
    backgroundColor: '#EFF3F4',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#',
  },
  notifyBadge: {
    position: 'absolute',
    backgroundColor: '#6940D0',
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
    color: '#000',
    marginLeft: 5,
  },
  btcamount: {
    color: '#A0A0A0',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  availabeText: {
    color: '#a0a0a0',
    fontSize: 12,
    marginTop: 5,
  },
  cardContainer: {
    // backgroundColor: '#1D1F20',
    height: 220,
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  cardNumber: {
    color: '#Ffffff',
    fontSize: 24,
  },
  cardExpDate: {
    color: '#fff',
    fontSize: 16,
  },
  cardExpiration: {
    color: '#EFF3F4',
    fontSize: 14,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },

  incomeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '49%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 20,
    borderColor: '#eef0f4',
    borderWidth: 1,
    elevation: 2,
  },

  arrowIcon: {
    width: 26,
    height: 26,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WalletDuplicate;
