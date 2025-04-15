import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = memo(() => {
  return (
    <LinearGradient
      colors={['#585858', '#37393b', '#282828']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}>
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default ProfileScreen;
