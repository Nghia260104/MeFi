import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  addWeeks,
  startOfWeek,
  format,
  addDays,
  isSameDay,
  isToday,
} from 'date-fns';
import {getFontFamily} from '../assets/fonts/helper';
import {horizontalScale, scaleFontSize} from '../assets/styles/scaling';

const WeekCalendar = ({weekStart, selectedDates, onSelectDate}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <View style={styles.weekContainer}>
      {days.map((day, index) => {
        const date = addDays(weekStart, index);
        const isSelected = selectedDates.some(selectedDate =>
          isSameDay(date, selectedDate),
        ); // Check if the date is in the selectedDates array
        const isCurrentDay = isToday(date);

        return (
          <TouchableOpacity
            key={day}
            style={styles.dayColumn}
            onPress={() => onSelectDate(date)}>
            <Text style={[styles.dayText, isSelected && styles.activeText]}>
              {day}
            </Text>
            <View
              style={[
                styles.dateCircle,
                // eslint-disable-next-line react-native/no-inline-styles
                (isCurrentDay || isSelected) && {
                  backgroundColor: isSelected ? '#FFF3D4' : '#F8D45B',
                },
              ]}>
              <Text style={[styles.dateText]}>{format(date, 'd')}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const InfiniteScrollCalendar = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [weeks, setWeeks] = useState([
    startOfWeek(addWeeks(new Date(), -1), {weekStartsOn: 1}),
    startOfWeek(new Date(), {weekStartsOn: 1}),
    startOfWeek(addWeeks(new Date(), 1), {weekStartsOn: 1}),
  ]);
  const [selectedDates, setSelectedDates] = useState([]);

  const swiperRef = useRef(null);

  const handleIndexChanged = index => {
    if (index === 0) {
      const newWeeks = [
        startOfWeek(addWeeks(weeks[0], -1), {weekStartsOn: 1}),
        ...weeks,
      ];
      setWeeks(newWeeks);
      setCurrentIndex(1);
      swiperRef.current.scrollBy(1, false);
    } else if (index === weeks.length - 1) {
      const newWeeks = [
        ...weeks,
        startOfWeek(addWeeks(weeks[weeks.length - 1], 1), {weekStartsOn: 1}),
      ];
      setWeeks(newWeeks);
    }
    setCurrentIndex(index);
  };

  const handleSelectDate = date => {
    if (selectedDates.some(selectedDate => isSameDay(selectedDate, date))) {
      // If the date is already selected, unselect it by removing from the selectedDates array
      setSelectedDates(
        selectedDates.filter(selectedDate => !isSameDay(selectedDate, date)),
      );
    } else {
      // Otherwise, add the date to the selectedDates array
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={false}
        onIndexChanged={handleIndexChanged}
        index={currentIndex}>
        {weeks.map((week, index) => (
          <WeekCalendar
            key={index}
            weekStart={week}
            selectedDates={selectedDates} // Pass the selectedDates array
            onSelectDate={handleSelectDate} // Handle selecting/unselecting dates
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(15),
  },
  dayColumn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: scaleFontSize(13),
    color: '#2E2E2E',
    marginBottom: 5,
    fontFamily: getFontFamily(500, ''),
  },
  dateCircle: {
    width: horizontalScale(25),
    height: horizontalScale(25),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(700, ''),
    color: '#603EF7',
  },
});

export default InfiniteScrollCalendar;
