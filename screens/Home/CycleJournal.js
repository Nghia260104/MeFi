import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CustomTitle from '../../component/customTitle';
import {getFontFamily} from '../../assets/fonts/helper';
import {useNavigation} from '@react-navigation/native';
import Plus from '../../assets/images/Home/Plus.svg';
import {useDispatch, useSelector} from 'react-redux';
import {scaleFontSize} from '../../assets/styles/scaling';
import {clearSelectedOptions, setDay} from '../../reducers/slices/optionSlice';

const CycleJournal = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const fullState = useSelector(state => state.options);
  const storedDay = useSelector(state => state.options.day);
  console.log(storedDay);

  useEffect(() => {
    const checkDay = () => {
      const today = new Date().getDate();
      if (today !== storedDay) {
        dispatch(clearSelectedOptions());
        dispatch(setDay(today));
      }
    };

    checkDay();
  }, [dispatch, storedDay]);

  // Helper function to get options by title
  const getOptionsForTitle = title => {
    const foundOption = fullState.selectedOptions.find(
      option => option.title === title,
    );
    return foundOption ? foundOption.selected : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomTitle goBack={true} title="Cycle Journal" />
      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        {/* Menstrual period Section */}
        <Text style={styles.title}>Menstrual period</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Carousel2')}>
          <Text style={styles.category}>Menstrual</Text>
          {/* Show selected options or Plus icon */}
          {getOptionsForTitle('Menstrual Period') ? (
            <Text style={styles.selectedOption}>
              {getOptionsForTitle('Menstrual Period')}
            </Text>
          ) : (
            <Plus width={16} height={16} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Carousel2')}>
          <Text style={styles.category}>Menstrual flow</Text>
          {getOptionsForTitle('Menstrual Flow') ? (
            <Text style={styles.selectedOption}>
              {getOptionsForTitle('Menstrual Flow')}
            </Text>
          ) : (
            <Plus width={16} height={16} />
          )}
        </TouchableOpacity>

        {/* Other statistics Section */}
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{marginTop: 20}}>
          <Text style={styles.title}>Other statistics</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Menstrual mood tracker</Text>
            {getOptionsForTitle('Menstrual Mood Tracker') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Menstrual Mood Tracker')}
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Menstrual symptoms</Text>
            {getOptionsForTitle('Menstrual Symptoms') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Menstrual Symptoms')}
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Menstrual flow color</Text>
            {getOptionsForTitle('Menstrual Flow Color') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Menstrual Flow Color')}
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Sleep Quality</Text>
            {getOptionsForTitle('Sleep Quality') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Sleep Quality')}
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Temperature</Text>
            {getOptionsForTitle('Temperature') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Temperature')} °C
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Carousel2')}>
            <Text style={styles.category}>Sexual activity</Text>
            {getOptionsForTitle('Sexual Activity') ? (
              <Text style={styles.selectedOption}>
                {getOptionsForTitle('Sexual Activity')}
              </Text>
            ) : (
              <Plus width={16} height={16} />
            )}
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 30,
    flexDirection: 'flex-start',
  },
  title: {
    fontSize: 15,
    color: '#2E2E2E',
    fontFamily: getFontFamily(600, ''),
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFE66C',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  category: {
    fontSize: 13,
    color: '#2E2E2E',
    fontFamily: getFontFamily(500, ''),
  },
  selectedOption: {
    fontSize: scaleFontSize(10),
    color: '#000',
    fontFamily: getFontFamily(500, ''),
  },
});

export default CycleJournal;
