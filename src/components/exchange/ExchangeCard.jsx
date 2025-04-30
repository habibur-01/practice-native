import React, {memo, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import CurrencyModal from './CurrencyModal';
import {useTheme} from '../../theme/ThemeContext';
import {currencies} from '../../data/data';

const ExchangeCard = memo(() => {
  const {theme} = useTheme();
  const [number, onChangeNumber] = React.useState('');
  const [number2, onChangeNumber2] = React.useState('');
  const [isSwap, setIsSwap] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [currency, setCurrency] = useState(currencies[2].name);
  const [currency2, setCurrency2] = useState(currencies[0].name);
  const [currencyRate, setCurrencyRate] = useState();

  useEffect(() => {
    // Mock exchange rate logic
    const getExchangeRate = (from, to) => {
      if (from === 'ETH' && to === 'USD') return 3225.4;
      if (from === 'USD' && to === 'ETH') return 1 / 3225.4;
      // Add more currencies if needed
      return 1;
    };

    const rate = getExchangeRate(currency, currency2);
    setCurrencyRate(rate);

    const num = parseFloat(number);
    if (!isNaN(num)) {
      onChangeNumber2((num * rate).toFixed(2));
    } else {
      onChangeNumber2('0');
    }
  }, [number, currency, currency2]);

  const handleSwap = () => {
    // Swap currencies
    const tempCurrency = currency;
    setCurrency(currency2);
    setCurrency2(tempCurrency);

    // Swap amounts
    const tempAmount = number;
    onChangeNumber(number2);
    onChangeNumber2(tempAmount);

    // Swap exchange rates
    setIsSwap(!isSwap);
  };

  return (
    <View>
      <LinearGradient
        colors={['#666666', '#5F5F5F', '#3d3c3c']}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#666666',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View>
            <Text style={{color: '#fff'}}>From</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Entypo name="wallet" size={16} color="#e0e0e0" />
            <Text style={{color: '#fff'}}>0</Text>
            <TouchableOpacity>
              <Text style={{color: '#EA955B'}}>Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: '#6b6b6b',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome5 name="ethereum" size={18} color="#e0e0e0" />
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: theme.primaryText,
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                {currency}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#e0e0e0"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="0"
            placeholderTextColor={'#fff'}
            keyboardType="numeric"
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            color: theme.textDark,
            textAlign: 'right',
            right: 10,
            bottom: 10,
            fontSize: 14,
          }}>
          $5.0639
        </Text>
      </LinearGradient>

      {/* Modal -1 */}
      <View>
        <CurrencyModal
          currency={currency}
          setCurrency={setCurrency}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>

      {/* Swap button Start */}
      <View style={styles.swapBtnContainer}>
        <TouchableOpacity style={styles.swapbtn} onPress={handleSwap}>
          <AntDesign name="swap" size={24} color="#e0e0e0" />
        </TouchableOpacity>
      </View>
      {/* Swap Button End */}

      <LinearGradient
        colors={['#6b6b6b', '#3f3f3f', '#3d3c3c']}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#666666',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <View>
            <Text style={{color: '#fff'}}>To</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}>
            <Entypo name="wallet" size={16} color="#e0e0e0" />
            <Text style={{color: '#fff'}}>0</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                backgroundColor: '#6b6b6b',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome6 name="usd" size={18} color="#e0e0e0" />
            </View>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
              onPress={() => setModalVisible2(true)}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  textTransform: 'uppercase',
                }}>
                {currency2}
              </Text>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={20}
                color="#e0e0e0"
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            defaultValue={number2.toString()}
            placeholder="0"
            placeholderTextColor={'#fff'}
            editable={false}
          />
        </View>
        <Text
          style={{
            position: 'absolute',
            color: theme.textDark,
            textAlign: 'right',
            right: 10,
            bottom: 10,
            fontSize: 14,
          }}>
          $5.0639
        </Text>
      </LinearGradient>
      {number > 0 && (
        <View style={{paddingHorizontal: 10, paddingTop: 10}}>
          <Text style={{color: '#a0a0a0'}}>
            1 {currency} = {currencyRate.toFixed(6)} {currency2}
          </Text>
        </View>
      )}
      {/* Modal -2 */}
      <View>
        <CurrencyModal
          currency={currency2}
          setCurrency={setCurrency2}
          modalVisible={modalVisible2}
          setModalVisible={setModalVisible2}
        />
      </View>

      <TouchableOpacity>
        <LinearGradient
          colors={['#EA955B', '#EA955B']}
          style={styles.continueBtn}>
          <Text style={{color: '#fff', fontSize: 16}}>Continue</Text>
        </LinearGradient>
      </TouchableOpacity>
      {number > 0 && (
        <View style={{flexDirection: 'column', gap: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>Estimate fee</Text>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>4.28 usd</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>
              You will recieve{' '}
            </Text>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>4320.28 USD</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>Spread </Text>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>0.2% USD</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>Gas fee </Text>
            <Text style={{color: '#a0a0a0', fontSize: 14}}>0.0045 ETH</Text>
          </View>
        </View>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 22,
    color: '#fff',
  },
  swapbtn: {
    width: 40,
    height: 40,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    transform: [{rotate: '90deg'}],
  },
  swapBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: -10,
    zIndex: 999,
  },
  continueBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginVertical: 20,
  },
});
export default ExchangeCard;
