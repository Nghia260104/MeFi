import React from 'react';
import {View, StyleSheet} from 'react-native';
import CustomTitle from '../../component/customTitle';

const Comics = () => {
  return (
    <View style={styles.container}>
      <CustomTitle title="Comics" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
});

export default Comics;
