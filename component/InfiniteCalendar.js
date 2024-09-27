import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {
  addWeeks,
  startOfWeek,
  format,
  addDays,
  isToday,
  isWithinInterval,
  parseISO,
} from 'date-fns';
import {useSelector} from 'react-redux'; // Import useSelector
import {getFontFamily} from '../assets/fonts/helper';
import {horizontalScale, scaleFontSize} from '../assets/styles/scaling';

const WeekCalendar = ({weekStart, periodStart, periodEnd}) => {
  try {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
      <View style={styles.weekContainer}>
        {days.map((day, index) => {
          const date = addDays(weekStart, index);
          const isWithinPeriod = isWithinInterval(date, {
            start: periodStart,
            end: periodEnd,
          }); // Check if the date is within the period range
          const isCurrentDay = isToday(date);

          return (
            <TouchableOpacity key={day} style={styles.dayColumn}>
              <Text style={[styles.dayText]}>{day}</Text>
              <View
                style={[
                  styles.dateCircle,
                  // eslint-disable-next-line react-native/no-inline-styles
                  (isCurrentDay || isWithinPeriod) && {
                    backgroundColor: isCurrentDay
                      ? '#F8D45B'
                      : isWithinPeriod && '#FFF3D4',
                  },
                ]}>
                <Text style={[styles.dateText]}>{format(date, 'd')}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } catch (error) {
    console.log('Error in WeekCalendar:', error);
    return <Text>Error rendering calendar</Text>;
  }
};

const InfiniteScrollCalendar = () => {
  // Fetch period_start and period_end from the Redux store
  const period_start = useSelector(state => state.user.period_start);
  const period_end = useSelector(state => state.user.period_end);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [weeks, setWeeks] = useState([
    startOfWeek(addWeeks(new Date(), -1), {weekStartsOn: 1}),
    startOfWeek(new Date(), {weekStartsOn: 1}),
    startOfWeek(addWeeks(new Date(), 1), {weekStartsOn: 1}),
  ]);

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
            periodStart={period_start ? parseISO(period_start) : null} // Fetch start date from Redux
            periodEnd={period_end ? parseISO(period_end) : null} // Fetch end date from Redux
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
    borderRadius: horizontalScale(25 / 2),
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
