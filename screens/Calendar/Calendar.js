import React from 'react';
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
  const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = useWindowDimensions();

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
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: 'orange',
            monthTextColor: 'blue',
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
