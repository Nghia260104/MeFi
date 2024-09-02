import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  scaleFontSize,
  horizontalScale,
  verticalScale,
} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const CustomButton = ({customStyle, title, onPress}) => {
  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FF8533',
    justifyContent: 'center',
    alignItems: 'center',
    padding: verticalScale(10),
    borderRadius: horizontalScale(35),
  },
  title: {
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
    fontSize: scaleFontSize(15),
    color: 'white',
  },
});

export default CustomButton;
