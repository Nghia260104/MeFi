import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import defaultFemale from '../../assets/images/defaultFemale.png';
import defaultMale from '../../assets/images/defaultMale.png';
import {horizontalScale, verticalScale} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

const CustomPost = item => {
  return (
    <View style={styles.container}>
      <Image
        source={item.gender ? defaultFemale : defaultMale}
        style={styles.avatar}
      />
      <Text style={styles.content}>{item.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    padding: horizontalScale(20),
    height: verticalScale(150),
    borderColor: '#D9D9D9',
  },
  avatar: {
    width: horizontalScale(50),
    height: horizontalScale(50),
  },
  content: {
    fontSize: horizontalScale(14),
    fontFamily: getFontFamily(400, ''),
    marginTop: verticalScale(10),
    lineHeight: verticalScale(20),
    color: '#1B141F',
  },
});

export default CustomPost;
