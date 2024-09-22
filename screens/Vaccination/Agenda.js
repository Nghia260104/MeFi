import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import CustomTitle from '../../component/customTitle';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState('2024-09-10');

  const items = {
    '2024-09-10': [
      {
        name: 'Engerix B',
        height: 50,
        day: '2024-09-10',
        time: '10:00',
        subtitle: 'Require testing before injection',
      },
    ],
    '2024-09-11': [
      {
        name: 'Meeting with Team',
        height: 50,
        day: '2024-09-11',
        time: '14:00',
        subtitle: 'Discuss project progress',
      },
    ],
    '2024-09-12': [
      {
        name: 'Dentist Appointment',
        height: 50,
        day: '2024-09-12',
        time: '11:30',
        subtitle: 'Regular checkup',
      },
    ],
  };

  const renderItem = item => {
    return (
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemTimeContainer}>
          <Text style={styles.itemTime}>{item.time}</Text>
        </View>
        <View style={styles.itemContentContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomTitle goBack={true} title="Calendar" />
      <Agenda
        items={items}
        selected={selectedDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        showClosingKnob={true}
        pastScrollRange={50}
        futureScrollRange={50}
        theme={{
          agendaDayTextColor: 'black',
          agendaDayNumColor: 'black',
          agendaTodayColor: '#4285F4',
          agendaKnobColor: '#4285F4',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
  },
  itemTimeContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTime: {
    color: '#888',
    fontSize: 13,
  },
  itemContentContainer: {
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#4285F4',
    paddingLeft: 10,
  },
  itemName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemSubtitle: {
    color: '#555',
    fontSize: 13,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default CalendarScreen;
