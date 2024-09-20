import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomTitle from '../../component/customTitle';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';

const Personal = () => {
  let width = useWindowDimensions().width;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <CustomTitle title="Information" />
      <View style={styles.userContainer}>
        <View style={styles.background} />
        <View
          style={[
            styles.avatarContainer,
            {left: (width - horizontalScale(40)) / 2 - horizontalScale(70)},
          ]}>
          <Image style={styles.avatar} />
        </View>
        <Text style={{marginTop: verticalScale(78)}}>Minh Anh</Text>
        <Text>Female - 21 years old</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  userContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
  background: {
    width: '100%',
    borderRadius: horizontalScale(10),
    height: verticalScale(230),
    backgroundColor: '#FFDF99',
  },
  avatarContainer: {
    flex: 1,
    position: 'absolute',
    top: verticalScale(160),
  },
  avatar: {
    width: horizontalScale(140),
    height: horizontalScale(140),
    borderRadius: horizontalScale(70),
    borderWidth: 2,
    borderColor: '#000',
  },
});

export default Personal;
