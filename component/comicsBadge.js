import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ComicsBadge = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Comics Badge</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#FFD700',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ComicsBadge;
