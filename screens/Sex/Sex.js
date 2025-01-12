import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {scaleFontSize, verticalScale} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import Male from '../../assets/images/Male.svg';
import Female from '../../assets/images/Female.svg';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setAlreadyLaunched} from '../../reducers/slices/checkSlice';
import {setGender} from '../../reducers/slices/genderSlice';

const Sex = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const alreadyLaunched = useSelector(state => state.check.alreadyLaunched);

  const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View
        style={[
          styles.choiceContainer,
          {width: SCREEN_WIDTH * 0.9, height: SCREEN_HEIGHT * 0.8},
        ]}>
        <Text style={styles.text}>What is your gender?</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
            !alreadyLaunched && dispatch(setAlreadyLaunched(true));
            dispatch(setGender(false));
          }}
          disabled>
          <Male width={SCREEN_WIDTH * 0.75} height={SCREEN_WIDTH * 0.75} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogIn');
            !alreadyLaunched && dispatch(setAlreadyLaunched(true));
            dispatch(setGender(true));
          }}>
          <Female width={SCREEN_WIDTH * 0.75} height={SCREEN_WIDTH * 0.75} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choiceContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginVertical: verticalScale(50),
  },
  text: {
    fontSize: scaleFontSize(28),
    fontFamily: getFontFamily(700, ''),
    color: '#2E2E2E',
    textAlign: 'center',
  },
});

export default Sex;
