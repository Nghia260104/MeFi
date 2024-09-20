import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

import Next from '../assets/images/Personal/Next.svg';

const CustomCategory = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.icon}
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{props.title}</Text>
        <Next width={horizontalScale(5)} height={verticalScale(10)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(600, ''),
    color: '#2E2E2E',
  },
  titleContainer: {
    flex: 0.93,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
  },
});

export default CustomCategory;
