import React, {memo} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const AllListItem = memo(() => {
  return (
    <View style={styles.listContainer}>
      <View style={styles.listCard}>
        <View>
          <Text style={{color: '#E0E0E0', fontSize: 12}}>ACTION</Text>
          <View style={styles.leftsection}>
            <Image
              source={require('../../assets/icon/apt.png')}
              resizeMode="contain"
              style={styles.tokenImage}
            />
            <View>
              <Text style={styles.token}>APT</Text>
              <Text style={styles.tokenTitle}>APTOS</Text>
            </View>
          </View>
          <Text style={styles.purchaaseTitle}>PURCHASES</Text>
        </View>
        <View>
          <Text style={{color: '#E0E0E0', fontSize: 12}}>DETAILS</Text>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <FontAwesome6 name="euro-sign" size={13} color="#fff" />
              <Text style={styles.token}>448.27</Text>
            </View>
            <Text style={styles.tokenTitle}>PRICE</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.token}>30.33</Text>
            <Text style={styles.tokenTitle}>QUANTITY</Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#E0E0E0', alignSelf: 'flex-end', fontSize: 12}}>
            STATUS
          </Text>
          <View style={{marginTop: 10}}>
            <Text
              style={[styles.token, {color: '#477468', alignSelf: 'flex-end'}]}>
              COMPLETE
            </Text>
            <Text style={[styles.tokenTitle, {alignSelf: 'flex-end'}]}>
              24-02-2021 15:30
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.listCard}>
        <View>
          <Text style={{color: '#E0E0E0'}}>Action</Text>
          <View style={styles.leftsection}>
            <Image
              source={require('../../assets/icon/apt1.png')}
              resizeMode="contain"
              style={styles.tokenImage}
            />
            <View>
              <Text style={styles.token}>APT</Text>
              <Text style={styles.tokenTitle}>APTOS</Text>
            </View>
          </View>
          <Text style={styles.purchaaseTitle}>PURCHASES</Text>
        </View>
        <View>
          <Text style={{color: '#E0E0E0'}}>Details</Text>
          <View style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <FontAwesome6 name="euro-sign" size={13} color="#fff" />
              <Text style={styles.token}>448.27</Text>
            </View>
            <Text style={styles.tokenTitle}>PRICE</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={styles.token}>30.33</Text>
            <Text style={styles.tokenTitle}>QUANTITY</Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#E0E0E0', alignSelf: 'flex-end'}}>Status</Text>
          <View style={{marginTop: 10}}>
            <Text
              style={[styles.token, {color: '#477468', alignSelf: 'flex-end'}]}>
              COMPLETE
            </Text>
            <Text style={[styles.tokenTitle, {alignSelf: 'flex-end'}]}>
              24-02-2021 15:30
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});
const styles = StyleSheet.create({
  listContainer: {},
  listCard: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#3f3f3f',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftsection: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  token: {
    color: '#fff',
    fontSize: 14,
  },
  tokenTitle: {
    color: '#C6C4C3',
    fontSize: 11,
  },
  purchaaseTitle: {
    marginTop: 10,
    color: '#eab47e',
    fontSize: 15,
    opacity: 0.8,
  },
  tokenImage: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
});

export default AllListItem;
