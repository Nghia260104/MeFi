import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import Logo from '../../assets/images/Splash/Logo.svg';

const Vaccination = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View style={styles.splash}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Vaccination;
