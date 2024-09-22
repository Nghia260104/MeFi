import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const width = Dimensions.get('window').width;
const badgeWidth = (width - horizontalScale(40)) / 3 - horizontalScale(7);

const CustomBadge = ({icon, title, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.badgeContainer}>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    width: badgeWidth,
    height: badgeWidth + horizontalScale(40),
    paddingVertical: verticalScale(25),
    paddingHorizontal: horizontalScale(10),
    borderRadius: horizontalScale(15),
    alignItems: 'center',
    gap: verticalScale(10),
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 12},
        shadowOpacity: 0.07,
        shadowRadius: 12,
      },
      android: {
        elevation: 7,
      },
    }),
  },
  text: {
    color: '#603EF7',
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(500, ''),
    textAlign: 'center',
  },
});

export default CustomBadge;
