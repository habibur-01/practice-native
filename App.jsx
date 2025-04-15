import React from 'react';

// import AppNavigator from './src/Navigator/AppNavigator';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/Navigator/AppNavigator';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <View style={{backgroundColor: '#fff', flexGrow: 1}}>
          <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
          <AppNavigator />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
