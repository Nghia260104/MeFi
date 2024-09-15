import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import Logo from '../../assets/images/Splash/Logo.svg';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.splash}>
        <Logo width={240} height={150} />
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
  container: {
    flex: 1,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash: {
    marginTop: verticalScale(150),
  },
  lottie: {
    marginLeft: horizontalScale(10),
    marginTop: verticalScale(160),
    width: horizontalScale(200),
    height: verticalScale(200),
  },
});

export default Splash;
