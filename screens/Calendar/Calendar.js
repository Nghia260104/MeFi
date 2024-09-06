import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
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

const PeriodTrackerCalendar = () => {
  const {height: SCREEN_HEIGHT} = useWindowDimensions();

  const [selectedRange, setSelectedRange] = useState({});

  const onDayPress = day => {
    if (
      Object.keys(selectedRange).length === 0 ||
      Object.keys(selectedRange).length === 2
    ) {
      // Start new selection
      setSelectedRange({
        [day.dateString]: {startingDay: true, color: '#FF8533'},
      });
    } else {
      // Complete the range
      const startDate = Object.keys(selectedRange)[0];
      const endDate = day.dateString;
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
        range[dateString] = {startingDay: true, color: '#FF8533'};
      } else if (dateString === endDate) {
        range[dateString] = {endingDay: true, color: '#FF8533'};
      } else {
        range[dateString] = {color: '#FFDF99', textColor: 'white'};
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return range;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
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
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#FF7F50',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#FF7F50',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#FF7F50',
            selectedDotColor: '#ffffff',
            arrowColor: '#FF7F50',
            monthTextColor: '#FF7F50',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <CustomButton
          customStyle={[styles.button, {marginTop: SCREEN_HEIGHT * 0.9}]}
          title="Next"
        />
      </View>
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
    fontFamily: getFontFamily('FZ Poppins', 700, ''),
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
    marginTop: 56,
  },
});

export default PeriodTrackerCalendar;
