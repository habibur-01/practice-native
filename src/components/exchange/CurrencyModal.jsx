import React, {memo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../theme/ThemeContext';
import {currencies} from '../../data/data';

const CurrencyModal = memo(
  ({modalVisible, setModalVisible, currency, setCurrency}) => {
    const {theme} = useTheme();
    const [searchText, setSearchText] = useState('');

    const filteredCurrencies = currencies.filter(currency =>
      currency?.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    const handleSelect = currency => {
      setCurrency(currency?.name);
      setModalVisible(false);
    };

    return (
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Header */}
            <Text style={styles.modalText}>Choose a network</Text>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Ionicons name="close-outline" size={24} color="#e0e0e0" />
            </TouchableOpacity>

            {/* Search */}
            <View style={styles.searchContainer}>
              <Ionicons
                name="search-outline"
                size={20}
                color="#aaa"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search currency"
                placeholderTextColor="#aaa"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* List */}
            {filteredCurrencies.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredCurrencies}
                keyExtractor={item => item?.name}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.currencyItem}
                    onPress={() => handleSelect(item)}>
                    <View style={styles.currencyContent}>
                      <View style={styles.currencySymbol}>
                        <Ionicons name={item?.symbol} size={20} color="#aaa" />
                      </View>
                      <Text style={styles.currencyText}>{item?.name}</Text>
                    </View>
                    {currency === item?.name ? (
                      <MaterialIcons
                        name="radio-button-on"
                        size={20}
                        color="#fff"
                      />
                    ) : (
                      <MaterialIcons
                        name="radio-button-off"
                        size={20}
                        color="#fff"
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.noResult}>No result found</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#373737',
    marginTop: responsiveHeight(18),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalView: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a4a4a',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    color: '#fff',
  },
  currencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#424141',
  },
  currencyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  currencySymbol: {
    backgroundColor: '#666666',
    width: 36,
    height: 36,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    color: '#fff',
  },
  noResult: {
    color: '#f6f6f6',
  },
});

export default CurrencyModal;
