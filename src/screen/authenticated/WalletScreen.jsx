import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PurchaseList from '../../components/wallet/PurchaseList';
import AllListItem from '../../components/wallet/AllListItem';
import DepositList from '../../components/wallet/DepositList';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {useTheme} from '../../theme/ThemeContext';
import Card from '../../components/wallet/Card';
import WalletTabSection from '../../components/wallet/WalletTabSection';
import {cardData} from '../../data/data';
import {useSharedValue} from 'react-native-reanimated';

const WalletScreen = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('cards');
  const [isTabActive, setIsTabActive] = useState('all');
  const {themeMode, theme} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  const [newData, setNewData] = useState([...cardData, ...cardData]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatedValue = useSharedValue(0);
  const MAX = 3;

  return (
    <LinearGradient
      colors={
        darkMode
          ? ['#585858', '#4F4F4F', '#1e1e1e', '#262626', '#161616']
          : ['#f6f8fa', '#f6f8fa']
      }
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity
          onPress={() => navigation.navigate('CARD_SCAN')}
          style={[
            styles.scannerBtn,
            {
              backgroundColor: theme.backgroundLight,
              borderColor: darkMode ? '#A0A0A0' : '#e5e7e8',
            },
          ]}>
          <MaterialCommunityIcons
            name="credit-card-scan-outline"
            size={26}
            color="#A0A0A0"
          />
        </TouchableOpacity>
        <View style={styles.tabContainer}>
          <LinearGradient
            colors={
              darkMode
                ? activeTab === 'tokens'
                  ? ['#616161', '#7A7A7A', '#7A7A7A']
                  : ['#484848', '#484847', '#484848']
                : activeTab === 'tokens'
                ? ['#000000', '#000000']
                : ['#ffffff', '#ffffff']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tabBtn,
              {
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                borderWidth: activeTab === 'tokens' ? 1 : 0,
                borderColor: '#7B7B7B',
              },
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('tokens')}>
              <Text
                style={{
                  color: darkMode
                    ? activeTab === 'tokens'
                      ? '#fff'
                      : '#A0A0A0'
                    : activeTab === 'tokens'
                    ? '#fff'
                    : '#000',
                }}>
                TOKENS
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={
              darkMode
                ? activeTab === 'cards'
                  ? ['#616161', '#7A7A7A', '#7A7A7A']
                  : ['#484848', '#484847', '#484848']
                : activeTab === 'cards'
                ? ['#000000', '#000000']
                : ['#ffffff', '#ffffff']
            }
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[
              styles.tabBtn,
              {
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
                borderWidth: activeTab === 'cards' ? 1 : 0,
                borderColor: darkMode ? '#7B7B7B' : '#666666',
              },
            ]}>
            <TouchableOpacity onPress={() => setActiveTab('cards')}>
              <Text
                style={{
                  color: darkMode
                    ? activeTab === 'cards'
                      ? '#fff'
                      : '#A0A0A0'
                    : activeTab === 'cards'
                    ? '#fff'
                    : '#000',
                }}>
                CARDS
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <LinearGradient
          colors={
            darkMode
              ? ['#5C5C5C', '#6B6764', '#8E7C70', '#948275']
              : ['#EFF3F4', '#EFF3F4']
          }
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={{borderRadius: 10}}>
          <TouchableOpacity
            onPress={() => console.log('notify')}
            style={[
              styles.notifyBtn,
              {borderColor: darkMode ? '#A0A0A0' : '#e5e7e8'},
            ]}>
            <Ionicons
              name="notifications-sharp"
              size={24}
              color={darkMode ? '#CAB9AD' : '#A0A0A0'}
            />
            <View
              style={[
                styles.notifyBadge,
                {backgroundColor: darkMode ? '#EA955B' : '#6940D0'},
              ]}>
              <Text style={styles.notifyBadgeText}>6</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Balance Section */}
      <View style={{marginVertical: 24}}>
        <View style={styles.amountContainer}>
          <FontAwesome
            name="euro"
            size={22}
            color={darkMode ? '#fff' : '#000'}
          />
          <Text style={[styles.amount, {color: darkMode ? '#fff' : '#000'}]}>
            5760.30
          </Text>
          <Text style={styles.btcamount}>~ 0.087952 BTC</Text>
        </View>
        <Text
          style={[
            styles.availabeText,
            {color: darkMode ? '#E0E0E0' : '#a0a0a0'},
          ]}>
          AVAILABLE BALANCE
        </Text>
      </View>

      {/* Card section */}
      <View style={{height: responsiveHeight(24), marginTop: 10}}>
        {newData.map((item, index) => {
          if (index > currentIndex + MAX || index < currentIndex) {
            return null;
          }
          return (
            <Card
              newData={newData}
              setNewData={setNewData}
              maxVisibleItems={MAX}
              item={item}
              index={index}
              dataLength={newData.length}
              animatedValue={animatedValue}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              key={index}
            />
          );
        })}
      </View>

      {/* Income & Withdrawal Tab */}
      <View
        style={{
          marginVertical: responsiveHeight(2),
          flexDirection: 'row',
          gap: 10,
        }}>
        <LinearGradient
          colors={darkMode ? ['#515353', '#4C4C4C'] : ['#FDFFFF', '#FDFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[
            styles.incomeBtn,
            {
              borderColor: darkMode ? '#7B7B7B' : '#eef0f4',
              elevation: darkMode ? 0 : 2,
            },
          ]}>
          <View
            style={[
              styles.arrowIcon,
              {backgroundColor: darkMode ? '#CCCCCC' : '#eef0f4'},
            ]}>
            <Feather name="arrow-down-left" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text
              style={{
                color: darkMode ? '#FFF' : '#010101',
                fontSize: responsiveFontSize(1.8),
              }}>
              <FontAwesome
                name="euro"
                size={14}
                color={darkMode ? '#fff' : '#010101'}
              />
              36 850.01
            </Text>
            <Text
              style={{
                color: darkMode ? '#C6C4C3' : '#a0a0a0',
                fontSize: responsiveFontSize(1.5),
              }}>
              INCOME
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={darkMode ? ['#515353', '#4C4C4C'] : ['#FDFFFF', '#FDFFFF']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={[
            styles.incomeBtn,
            {
              borderColor: darkMode ? '#7B7B7B' : '#eef0f4',
              elevation: darkMode ? 0 : 2,
            },
          ]}>
          <View
            style={[
              styles.arrowIcon,
              {backgroundColor: darkMode ? '#CCCCCC' : '#eef0f4'},
            ]}>
            <Feather name="arrow-up-right" size={20} color="#4F4F4F" />
          </View>
          <View style={styles.incomeText}>
            <Text
              style={{
                color: darkMode ? '#FFF' : '#010101',
                fontSize: responsiveFontSize(1.8),
              }}>
              <FontAwesome
                name="euro"
                size={14}
                color={darkMode ? '#fff' : '#010101'}
              />
              7200.48
            </Text>
            <Text
              style={{
                color: darkMode ? '#C6C4C3' : '#a0a0a0',
                fontSize: responsiveScreenFontSize(1.5),
              }}>
              WITHDRAWAL
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/* Tab section */}
      <WalletTabSection
        isTabActive={isTabActive}
        setIsTabActive={setIsTabActive}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 10,
          height: responsiveHeight(10),
          // overflow: 'hidden',
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

  incomeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    // backgroundColor: '#CCCCCC',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerBtn: {
    position: 'relative',
    // backgroundColor: '#717171',
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  notifyBtn: {
    height: 44,
    width: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: '#A0A0A0',
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
    // backgroundColor: '#EA955B',
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
    marginLeft: 5,
  },
  btcamount: {
    color: '#A0A0A0',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginLeft: 10,
  },
  availabeText: {
    fontSize: 12,
    marginTop: 5,
  },
  // cardContainer: {
  //   position: 'relative',
  //   flex: 1,
  //   justifyContent: 'center',
  //   height: responsiveHeight(100),
  //   borderWidth: 1,
  //   borderColor: '#E0E0E0',
  //   // marginTop: 30,
  //   // alignItems: 'center',
  // },
});

export default WalletScreen;
