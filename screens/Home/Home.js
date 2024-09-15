/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import InfiniteScrollCalendar from '../../component/InfiniteCalendar';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';

import Avatar from '../../assets/images/Home/Avatar.svg';
import Hello from '../../assets/images/Home/Hello.svg';
import Statistic from '../../assets/images/Home/Statistic.svg';
import Period from '../../assets/images/Home/Period.svg';
import Whatnews from '../../assets/images/Home/Whatnews.svg';

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('');
            }}>
            <Avatar width={50} height={50} />
          </TouchableWithoutFeedback>
          <View style={styles.greetingContainer}>
            <Text style={styles.avatar}>Hey,</Text>
            <Text style={styles.avatar}>Minh Anh</Text>
          </View>
        </View>
        <View style={styles.calendar}>
          <InfiniteScrollCalendar />
        </View>
      </View>
      <View style={styles.greetingRabbieContainer}>
        <Hello width={320} height={170} />
        <View style={styles.hello}>
          <TouchableWithoutFeedback>
            <Text
              style={{
                color: '#000',
                fontSize: scaleFontSize(15),
                fontFamily: getFontFamily('FZ Poppins', 600, ''),
              }}>
              How are you today?
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.functionContainer}>
        <View
          style={{
            marginTop: verticalScale(20),
          }}>
          <TouchableOpacity>
            <Statistic
              width={horizontalScale(340)}
              height={verticalScale(100)}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: verticalScale(20),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TouchableOpacity>
              <Whatnews
                width={horizontalScale(150)}
                height={verticalScale(140)}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginLeft: horizontalScale(15)}}>
            <TouchableOpacity>
              <Period
                width={horizontalScale(150)}
                height={verticalScale(150)}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDD7E',
  },
  userContainer: {
    backgroundColor: 'white',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  avatarContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(30),
    marginLeft: horizontalScale(20),
  },
  greetingContainer: {
    marginLeft: horizontalScale(12),
    justifyContent: 'space-between',
  },
  greetingRabbieContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  avatar: {
    color: '#000',
    fontSize: scaleFontSize(17),
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
  },
  calendar: {
    marginTop: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  hello: {
    position: 'absolute',
    top: verticalScale(18),
    right: horizontalScale(47),
  },
  functionContainer: {
    alignItems: 'center',
    marginHorizontal: horizontalScale(20),
  },
});

export default Home;
