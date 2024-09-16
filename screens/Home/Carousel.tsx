import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View, Text} from 'react-native';
import {getFontFamily} from '../../assets/fonts/helper';

const Carousel = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.item}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>MENSTRUAL</Text>
        </View>
        <View style={styles.choiceContainer}>
          <Text style={styles.choices}>I'm on my period</Text>
          <Text style={styles.choices}>I'm not having my period</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  item: {
    height: 465,
    width: '100%',
    paddingHorizontal: 40,
  },
  titleContainer: {
    backgroundColor: '#FF8533',
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 8,
    justifyContent: 'flex-start',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
  },
  choiceContainer: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 400,
    elevation: 10,
  },
  choices: {
    color: '#000',
    fontSize: 13,
    fontFamily: getFontFamily('FZ Poppins', 500, ''),
    paddingLeft: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#D9D9D9',
  },
});

export default Carousel;
