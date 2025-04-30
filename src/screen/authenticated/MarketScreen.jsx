import React, {useState, memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewComponent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AssetsList from '../../components/markets/AssetsList';
import TradableList from '../../components/markets/TradableList';
import NewListed from '../../components/markets/NewListed';
import {useTheme} from '../../theme/ThemeContext';
import CardSection from '../../components/markets/CardSection';
import MarketTabSection from '../../components/markets/MarketTabSection';

const MarketScreen = memo(() => {
  const [expandGainers, setExpandGainers] = useState(false);
  const [expandMore, setExpandMore] = useState(false);
  const [isTabActive, setIsTabActive] = useState('assets');
  const navigation = useNavigation();
  const {themeMode} = useTheme();
  const darkMode = themeMode === 'dark' ? true : false;
  return (
    <LinearGradient
      colors={
        darkMode
          ? ['#585858', '#4F4F4F', '#1e1e1e', '#0f0f0f', '#0f0f0f']
          : ['#f6f8fa', '#f6f8fa']
      }
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      {/* Top section */}
      <View style={styles.topSection}>
        <LinearGradient
          colors={
            darkMode
              ? ['#575757', '#5F5F5F', '#727272']
              : ['#EFF3F4', '#EFF3F4']
          }
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          style={[
            styles.scannerBtn,
            {borderColor: darkMode ? '#A0A0A0' : '#e5e7e8'},
          ]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="view-dashboard"
              size={24}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        </LinearGradient>

        <Text
          style={[
            styles.topSectionTitle,
            {color: darkMode ? '#fff' : '#010101'},
          ]}>
          CRYFORGE
        </Text>

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

      {/* Asset section start */}
      <View>
        <CardSection
          expandGainers={expandGainers}
          setExpandGainers={setExpandGainers}
        />
      </View>

      {/* Market Section Start*/}
      <View>
        <View
          style={{
            marginTop: 30,
            marginBottom: 18,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View>
            <Text
              style={{fontSize: 20, color: darkMode ? '#F6F6F6' : '#010101'}}>
              MARKET
            </Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setExpandMore(!expandMore)}>
              <Text
                style={{
                  color: darkMode ? '#E0E0E0' : '#3f3b3b',
                  fontSize: 11,
                }}>
                LAST WEEK
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={17}
                color={darkMode ? '#DADADA' : '#3f3b3b'}
              />
            </TouchableOpacity>
            {expandMore && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 10,
                  transform: 'translateY(30%)',
                  zIndex: 1,
                  width: 130,
                  backgroundColor: darkMode ? '#484848' : '#EFF3F4',
                  borderWidth: 1,
                  borderColor: darkMode ? '#7A7A7A' : '#dee1e8',
                  paddingHorizontal: 10,
                  borderRadius: 12,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    borderBottomWidth: 0.8,
                    borderColor: darkMode ? '#6b6b6b' : '#dee1e8',
                  }}>
                  <Text
                    style={{
                      color: darkMode ? '#F6F6F6' : '#3f3b3b',
                      fontSize: 11,
                    }}>
                    LAST MONTH
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingVertical: 10}}>
                  <Text
                    style={{
                      color: darkMode ? '#F6F6F6' : '#3f3b3b',
                      fontSize: 11,
                    }}>
                    LAST 3 MOTNH
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Tab section */}
      <MarketTabSection
        setIsTabActive={setIsTabActive}
        isTabActive={isTabActive}
      />
      {/* Tab content container */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginTop: 16,
          height: responsiveHeight(10),
          overflow: 'hidden',
        }}>
        {isTabActive === 'assets' && <AssetsList />}
        {isTabActive === 'tradable' && <TradableList />}
        {isTabActive === 'new' && <NewListed />}
      </ScrollView>
    </LinearGradient>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topSectionTitle: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 3,
  },

  tab: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scannerBtn: {
    position: 'relative',
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
    alignItems: 'center',
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
    backgroundColor: '#171F38',
    height: 220,
    width: '100%',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D3E3FD',
    borderRadius: 20,
  },
  image: {
    width: 40,
    height: 40,
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

export default MarketScreen;
