// import {BottomTabs} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text, View} from 'react-native';
import {BottomTabs} from '../../Navigator/AppNavigator';

const Dashboard = () => {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <BottomTabs />
    </View>
  );
};

export default Dashboard;
