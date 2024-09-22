/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollViewBase,
} from 'react-native';
import InfiniteScrollCalendar from '../../component/InfiniteCalendar';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';

import Hello from '../../assets/images/Home/Hello.svg';
import Statistic from '../../assets/images/Home/Statistic.svg';
import Period from '../../assets/images/Home/Period.svg';
import Whatnews from '../../assets/images/Home/Whatnews.svg';
import {useSelector} from 'react-redux';
import {differenceInDays, isBefore, isToday, parseISO} from 'date-fns';
import {ScrollView} from 'react-native-gesture-handler';

const Home = () => {
  const [day, setDay] = useState(0);
  const navigation = useNavigation();

  const user = useSelector(state => state.user);
  const period_start = useSelector(state => state.period.period_start);
  const period_end = useSelector(state => state.period.period_end);
  const profileImage = useSelector(state => state.image.profileImage);

  useEffect(() => {
    if (period_start && period_end) {
      const start = parseISO(period_start);
      const end = parseISO(period_end);
      const today = new Date();

      if (isBefore(today, end) || isToday(end)) {
        // If today is before or equal to period_end, calculate day difference
        const dayDifference = differenceInDays(today, start);
        setDay(dayDifference);
      } else {
        // If today is after period_end, reset the day to 0
        setDay(0);
      }
    }
  }, [period_start, period_end]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.userContainer}>
        <View style={styles.avatarContainer}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Personal');
            }}>
            <Image
              style={styles.avatar}
              source={
                typeof profileImage === 'string'
                  ? {uri: profileImage}
                  : profileImage
              }
              resizeMode="cover"
            />
          </TouchableWithoutFeedback>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hey,</Text>
            <Text style={styles.greeting}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.calendar}>
          <InfiniteScrollCalendar />
        </View>
      </View>
      <ScrollView>
        <View style={styles.greetingRabbieContainer}>
          <Hello width={320} height={170} />
          <View style={styles.hello}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('CycleJournal')}>
              <Text
                style={{
                  color: '#000',
                  fontSize: scaleFontSize(15),
                  fontFamily: getFontFamily(600, ''),
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
                <Text style={styles.whatnews}>What's new?</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: horizontalScale(15)}}>
              <TouchableOpacity>
                <Period
                  width={horizontalScale(150)}
                  height={verticalScale(140)}
                />
                <Text style={styles.period}>Period</Text>
                <Text style={styles.day}>Day: {day}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  avatar: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: horizontalScale(25),
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
  greeting: {
    color: '#000',
    fontSize: scaleFontSize(17),
    fontFamily: getFontFamily(600, ''),
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
  whatnews: {
    position: 'absolute',
    color: '#fff',
    fontSize: scaleFontSize(15),
    fontFamily: getFontFamily(600, ''),
    textAlign: 'center',
    top: verticalScale(20),
    left: horizontalScale(15),
  },
  period: {
    position: 'absolute',
    color: '#fff',
    fontSize: scaleFontSize(15),
    fontFamily: getFontFamily(600, ''),
    textAlign: 'center',
    top: verticalScale(20),
    left: horizontalScale(15),
  },
  day: {
    position: 'absolute',
    color: '#fff',
    fontSize: scaleFontSize(30),
    fontFamily: getFontFamily(600, ''),
    textAlign: 'center',
    top: verticalScale(50),
    left: horizontalScale(15),
  },
});

export default Home;
