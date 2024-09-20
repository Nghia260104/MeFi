import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Rabbie from '../../assets/images/Calendar/Rabbie.svg';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';
import CustomButton from '../../component/customButton';
import {useNavigation} from '@react-navigation/native';

const PeriodTrackerCalendar = () => {
  const navigation = useNavigation();

  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const [selectedRange, setSelectedRange] = useState({});

  const onDayPress = day => {
    const selectedDate = day.dateString;
    const isStartDate = selectedRange[selectedDate]?.startingDay;
    const isEndDate = selectedRange[selectedDate]?.endingDay;

    // If start date or end date is pressed again, unselect it
    if (isStartDate || isEndDate) {
      setSelectedRange({});
    } else if (
      Object.keys(selectedRange).length === 0 ||
      Object.keys(selectedRange).length === 2
    ) {
      // Start new selection
      setSelectedRange({
        [selectedDate]: {startingDay: true, color: '#FF8533'},
      });
    } else {
      // Complete the range
      const startDate = Object.keys(selectedRange)[0];
      const endDate = selectedDate;
      const range = getDateRange(startDate, endDate);
      setSelectedRange(range);
    }
  };

  const getDateRange = (startDate, endDate) => {
    const range = {};
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const dateString = currentDate.toISOString().split('T')[0];
      if (dateString === startDate) {
        range[dateString] = {
          startingDay: true,
          color: '#FF8533',
          textColor: 'white',
        };
      } else if (dateString === endDate) {
        range[dateString] = {
          endingDay: true,
          color: '#FF8533',
          textColor: 'white',
        };
      } else {
        range[dateString] = {color: '#FFDF99', textColor: 'black'};
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView>
        <View style={styles.content}>
          <Text style={[styles.title, {marginTop: SCREEN_HEIGHT * 0.12}]}>
            How long does your period?
          </Text>
          <View style={[styles.bunnyContainer, {top: SCREEN_HEIGHT * 0.15}]}>
            <Rabbie width={178} height={220} />
          </View>
          <Calendar
            style={[styles.calendar, {marginTop: SCREEN_HEIGHT * 0.37}]}
            onDayPress={onDayPress}
            markingType={'period'}
            markedDates={selectedRange}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#000000',
              selectedDayBackgroundColor: '#FF8533',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#FF7F50',
              dayTextColor: '#2d4150',
              textDisabledColor: 'rgba(0, 0, 0, 0.40)',
              arrowColor: '#000000',
              monthTextColor: '#828282',
              textDayFontFamily: getFontFamily(600, ''),
              textMonthFontFamily: getFontFamily(500, ''),
              textDayHeaderFontFamily: getFontFamily(500, ''),
              textDayFontSize: 17,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
          />
          <CustomButton
            customStyle={[styles.button, {marginTop: SCREEN_HEIGHT * 0.9}]}
            title="Next"
            onPress={() => navigation.navigate('PeriodFrequency')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDF99', // Light orange background
  },
  content: {
    flex: 1,
    padding: horizontalScale(20),
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    zIndex: 1,
    fontSize: scaleFontSize(25),
    fontFamily: getFontFamily(700, ''),
    color: '#FF8533',
    textAlign: 'center',
  },
  bunnyContainer: {
    position: 'absolute',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  calendar: {
    borderRadius: 30,
    elevation: 4,
    backgroundColor: 'white',
    height: 'auto',
    width: 321,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#FCA735',
    height: 60,
    width: 150,
    borderRadius: 35,
    alignItems: 'center',
  },
});

export default PeriodTrackerCalendar;
