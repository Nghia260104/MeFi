/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Flowers from '../../assets/images/Calendar/Flowers.svg';
import CustomButton from '../../component/customButton';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';

const PeriodFrequency = () => {
  const navigation = useNavigation();
  const [answer, setAnswer] = useState('');
  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const handleAnswer = choice => {
    setAnswer(choice);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView>
        <View style={styles.content}>
          <Text style={[styles.title, {marginTop: SCREEN_HEIGHT * 0.1}]}>
            Do you have regular periods?
          </Text>
          <Text style={[styles.subtitle, {marginTop: SCREEN_HEIGHT * 0.02}]}>
            This means that you have a consistent number of days in a month
            between your periods.
          </Text>
          <View style={styles.flower}>
            <Flowers width={166} height={99} />
          </View>
          <View style={styles.answerContainer}>
            <TouchableOpacity
              style={[
                styles.answerButton,
                {backgroundColor: answer === 'Yes' ? '#FF8533' : '#ECEAEA'},
              ]}
              onPress={() => handleAnswer('Yes')}>
              <Text style={styles.answer}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                {backgroundColor: answer === 'No' ? '#FF8533' : '#ECEAEA'},
              ]}
              onPress={() => handleAnswer('No')}>
              <Text style={styles.answer}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.answerButton,
                {
                  backgroundColor:
                    answer === "I'm not sure" ? '#FF8533' : '#ECEAEA',
                },
              ]}
              onPress={() => handleAnswer("I'm not sure")}>
              <Text style={styles.answer}>I'm not sure</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            customStyle={[styles.button]}
            title="Get Started"
            onPress={() => navigation.navigate('Main')}
            textColor={'black'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF', // Light orange background
  },
  content: {
    flex: 1,
    padding: horizontalScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFontSize(25),
    fontFamily: getFontFamily(700, ''),
    color: '#FF8533',
    textAlign: 'center',
  },
  subtitle: {
    color: '#595959',
    fontFamily: getFontFamily(500, ''),
    fontSize: scaleFontSize(15),
    margintop: verticalScale(13),
    textAlign: 'center',
    marginHorizontal: horizontalScale(40),
  },
  flower: {
    marginTop: verticalScale(20),
  },
  answerContainer: {
    marginTop: verticalScale(25),
    justifyContent: 'space-between',
    height: verticalScale(190),
    width: '100%',
  },
  answerButton: {
    borderRadius: horizontalScale(10),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(15),
  },
  answer: {
    fontSize: scaleFontSize(15),
    fontFamily: getFontFamily(500, ''),
    color: '#2E2E2E',
  },
  button: {
    marginTop: verticalScale(70),
    backgroundColor: '#FFDF99',
    height: 60,
    width: 150,
    borderRadius: 35,
    alignItems: 'center',
  },
});

export default PeriodFrequency;
