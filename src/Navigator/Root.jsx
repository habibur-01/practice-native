import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useState} from 'react';
import {DashboardNavigator} from './AppNavigator';

export default function Root() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <View style={{flex: 1}}>
      {loggedIn && <DashboardNavigator />}
      {/* */}
    </View>
  );
}

const styles = StyleSheet.create({});
