import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const orderData = [
  {demand: 350.66, price: 4.437181, offer: 3.952488, total: 652.09},
  {demand: 134.38, price: 4.307102, offer: 3.682667, total: 48.05},
  {demand: 577.56, price: 4.280385, offer: 3.634125, total: 870.73},
  {demand: 797.5, price: 4.12687, offer: 3.58572, total: 157.24},
  {demand: 280.91, price: 4.064912, offer: 3.535958, total: 592.92},
  {demand: 547.45, price: 3.934655, offer: 3.475921, total: 205.15},
  {demand: 59.19, price: 3.849526, offer: 3.384806, total: 52.47},
];

const MAX_WIDTH = 150;
const MAX_DEMAND = Math.max(...orderData.map(item => item.demand));
const MAX_OFFER = Math.max(...orderData.map(item => item.total));

const OrderBookChart = () => {
  const [showMore, setShowMore] = useState(false);
  const [amount, setAmount] = useState('0.000001');
  const handleAmount = item => {
    setAmount(item);
  };
  const renderRow = ({item}) => {
    const demandWidth = (item.demand / MAX_DEMAND) * MAX_WIDTH;
    const offerWidth = (item.total / MAX_OFFER) * MAX_WIDTH;

    return (
      <View style={styles.row}>
        <View style={{width: '50%'}}>
          {/* Price */}
          <View style={styles.center}>
            <Text style={[styles.text, styles.price]}>
              {item.demand.toFixed(2)}
            </Text>
          </View>
          {/* Demand */}
          <View style={styles.barWrapper}>
            <Text style={styles.text}>{item.price.toFixed(6)}</Text>
            <View style={styles.demandBarBackground}>
              <View
                style={[
                  styles.bar,
                  {
                    width: demandWidth,
                    backgroundColor: '#555046',
                    position: 'absolute',
                    right: 0,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* Offer */}
        <View style={[styles.barContainer, {alignItems: 'flex-start'}]}>
          <View style={styles.barWrapper}>
            <Text style={[styles.text, {left: 10, color: '#8D8D8D'}]}>
              {item.offer.toFixed(6)}
            </Text>
            <View style={styles.demandBarBackground}>
              <View
                style={[
                  styles.bar,
                  {
                    width: offerWidth,
                    backgroundColor: '#454545',
                    position: 'absolute',
                    left: 0,
                  },
                ]}
              />
            </View>
          </View>
          <Text style={[styles.text, {top: 6, color: '#f6f6f6'}]}>
            {item.total.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{width: '50%'}}>
          <Text style={styles.headerText}>DEMAND</Text>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.headerText}>OFFER</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{color: '#f6f6f6', fontSize: 11}}>{amount}</Text>
            <TouchableOpacity onPress={() => setShowMore(!showMore)}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={16}
                color="#f6f6f6"
              />
            </TouchableOpacity>
            {showMore && (
              <View
                style={{
                  width: 80,
                  backgroundColor: '#373737',
                  borderWidth: 1,
                  borderColor: '#d4d4d4',
                  position: 'absolute',
                  borderRadius: 5,
                  top: 0,
                  right: 0,
                  transform: 'translateY( 20% )',
                  padding: 10,
                  zIndex: 999,
                }}>
                <TouchableOpacity onPress={() => handleAmount('0.000001')}>
                  <Text
                    style={{
                      color: '#f6f6f6',
                      fontSize: 11,
                      paddingVertical: 5,
                    }}>
                    0.000001
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleAmount('0.000002')}>
                  <Text
                    style={{
                      color: '#f6f6f6',
                      fontSize: 11,
                      paddingVertical: 5,
                    }}>
                    0.000002
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      <FlatList
        data={orderData}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  headerText: {color: '#A4A4A4', fontSize: 11},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  barContainer: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    alignSelf: 'flex-end',
    height: 30,
  },
  center: {
    width: 100,
    alignItems: 'center',
  },
  text: {
    position: 'absolute',
    right: 10,
    color: '#D5D0B8',
    fontSize: 12,
    zIndex: 1,
  },
  price: {
    left: 0,
    top: 6,
    fontWeight: 'bold',
    color: '#f6f6f6',
  },

  barWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  demandBarBackground: {
    flex: 1,
    height: 30,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: 'relative',
  },
});

export default OrderBookChart;
