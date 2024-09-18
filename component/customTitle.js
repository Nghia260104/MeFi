import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from '../assets/images/BackChevron.svg';
import {useNavigation} from '@react-navigation/native';
import {scaleFontSize} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const CustomTitle = ({customStyle, title}) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, customStyle]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackChevron width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <View style={{width: 24, height: 24}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
  },
  text: {
    color: '#000000',
    fontSize: scaleFontSize(17),
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
  },
});

export default CustomTitle;
