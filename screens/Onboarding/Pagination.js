import React from 'react';
import {View, StyleSheet} from 'react-native';
import {horizontalScale} from '../../assets/styles/scaling';
import Dot from './Dot';

const Pagination = ({data, x}) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => {
        return <Dot index={index} x={x} key={index} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: horizontalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pagination;
