import LottieView from 'lottie-react-native';
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';

import Logo from '../../assets/images/Splash/Logo.svg';

const Vaccination = () => {
  return (
    <SafeAreaView>
      <StatusBar hidden />
      <View style={styles.splash}>
        <Logo width={260} height={200} />
        <LottieView
          source={require('../../assets/images/Splash/Splash.json')}
          style={styles.lottie}
          autoPlay
          loop
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
});

export default Vaccination;
