import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Slider from './Slider';
import CustomButton from '../../component/customButton';
import {useNavigation} from '@react-navigation/native';
import {Item} from './Data';
import Animated from 'react-native-reanimated';

const Carousel2 = () => {
  const navigation = useNavigation();

  return (
    <Animated.View style={styles.container}>
      <StatusBar hidden />
      <Slider itemList={Item} />
      <CustomButton
        customStyle={styles.done}
        title={'Done'}
        onPress={() => navigation.navigate('Home')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  done: {
    position: 'absolute',
    width: 120,
    bottom: 40,
  },
});

export default Carousel2;
