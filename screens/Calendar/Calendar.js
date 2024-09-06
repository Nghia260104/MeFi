import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Rabbie from '../../assets/images/Calendar/Rabbie.svg';
import {scaleFontSize} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

const PeriodTrackerCalendar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <Text style={styles.title}>How long does your period?</Text>
        <View style={styles.bunnyContainer}>
          <Rabbie width={178} height={220} />
        </View>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: scaleFontSize(25),
    fontFamily: getFontFamily('FZ Poppins', 700, ''),
  },
  bunnyContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bunny: {
    fontSize: 50,
  },
  calendar: {
    borderRadius: 30,
    elevation: 4,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FF7F50', // Coral color for button
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PeriodTrackerCalendar;
