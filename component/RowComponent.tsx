/* eslint-disable react-native/no-inline-styles */
import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {horizontalScale} from '../assets/styles/scaling';

interface Props {
  children: any;
  styles?: StyleProp<ViewStyle>;
}

const RowComponent = (props: Props) => {
  const {children, styles} = props;

  return (
    <View
      style={[
        styles,
        {
          flexDirection: 'row',
          padding: horizontalScale(4),
        },
      ]}>
      {children}
    </View>
  );
};

export default RowComponent;
