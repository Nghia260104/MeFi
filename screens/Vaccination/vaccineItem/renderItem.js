import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../../assets/styles/scaling';
import {getFontFamily} from '../../../assets/fonts/helper';

const Vaccine = item => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.image} resizeMode="cover" />
      </View>
      <View style={styles.vaccineContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.origin}>{item.origin}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(40),
    padding: horizontalScale(15),
    elevation: 1,
    borderRadius: horizontalScale(16),
  },
  imageContainer: {
    width: horizontalScale(90),
    height: horizontalScale(90),
    backgroundColor: '#F3F3F3',
  },
  image: {
    width: horizontalScale(90),
    height: horizontalScale(90),
  },
  vaccineContainer: {
    justifyContent: 'center',
    marginLeft: horizontalScale(10),
    gap: verticalScale(8),
  },
  name: {
    fontSize: scaleFontSize(15),
    fontFamily: getFontFamily(500, ''),
    color: '#603EF7',
  },
  origin: {
    fontSize: scaleFontSize(12),
    fontFamily: getFontFamily(400, ''),
    color: '#818181',
  },
});

export default Vaccine;
