import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import CustomTitle from '../../component/customTitle';

import Noti from '../../assets/images/Vaccination/Noti.svg';
import Activities from '../../assets/images/Vaccination/Activities.svg';
import Schedule from '../../assets/images/Vaccination/Schedule.svg';
import Places from '../../assets/images/Vaccination/Places.svg';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import CustomBadge from '../../component/customBadge';
import {getFontFamily} from '../../assets/fonts/helper';

const Vaccination = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <CustomTitle
        title="Vaccination"
        icon={<Noti width={horizontalScale(18)} height={horizontalScale(18)} />}
      />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.subFunction}>
          <CustomBadge
            icon={
              <Activities
                width={horizontalScale(24)}
                height={horizontalScale(24)}
              />
            }
            title="Vaccination Activities"
          />
          <CustomBadge
            icon={
              <Schedule
                width={horizontalScale(24)}
                height={horizontalScale(24)}
              />
            }
            title="Upcoming vaccination schedule"
          />
          <CustomBadge
            icon={
              <Places
                width={horizontalScale(24)}
                height={horizontalScale(24)}
              />
            }
            title="Injection places near me"
          />
        </View>
        <View style={styles.list}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              fontSize: scaleFontSize(15),
              fontFamily: getFontFamily(600, ''),
              color: '#000',
              lineHeight: verticalScale(20),
            }}>
            List of vaccines
          </Text>
          <TouchableWithoutFeedback>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontFamily: getFontFamily(500, ''),
                fontSize: scaleFontSize(11),
                color: '#FF8533',
                lineHeight: verticalScale(20),
              }}>
              See more
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(25),
    padding: horizontalScale(5),
  },
  subFunction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Vaccination;
