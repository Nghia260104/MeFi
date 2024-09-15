import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BackChevron from '../assets/images/BackChevron.svg';
import {useNavigation} from '@react-navigation/native';
import {scaleFontSize} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

const CustomTitle = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackChevron width={18} height={14} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF8DC',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000000',
    fontSize: scaleFontSize(17),
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
  },
});

export default CustomTitle;
