import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import CustomTitle from '../../component/customTitle';
import CustomBadge from '../../component/customBadge';
import Vaccine from './vaccineItem/renderItem';

import Noti from '../../assets/images/Vaccination/Noti.svg';
import Activities from '../../assets/images/Vaccination/Activities.svg';
import Schedule from '../../assets/images/Vaccination/Schedule.svg';
import Places from '../../assets/images/Vaccination/Places.svg';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

import {getGlobalVaccine} from '../../actions/vaccines';
import LottieView from 'lottie-react-native';
import Search from '../../component/searchBar';

import defaultVaccine from './defaultVaccine.jpg';

const ItemSeparator = () => <View style={{height: verticalScale(10)}} />;

const ListHeader = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={{marginBottom: horizontalScale(35)}}>
        <Search />
      </View>
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
          onPress={() => navigation.navigate('Agenda')}
        />
        <CustomBadge
          icon={
            <Places width={horizontalScale(24)} height={horizontalScale(24)} />
          }
          title="Injection places near me"
        />
      </View>
      <View style={styles.list}>
        <Text style={styles.listTitle}>List of vaccines</Text>
        <TouchableWithoutFeedback>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const Vaccination = () => {
  const vaccineData = useSelector(state => state.vaccines.globalVaccines);
  const dispatch = useDispatch();
  const [randomVaccines, setRandomVaccines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!vaccineData) {
      dispatch(getGlobalVaccine());
    } else {
      setIsLoading(false);
    }
  }, [dispatch, vaccineData]);

  const vaccine = useMemo(
    () => [
      {
        id: 1,
        name: 'Pfizer-BioNTech',
        origin: 'USA',
        vaccineImage: defaultVaccine,
      },
      {
        id: 2,
        name: 'Moderna',
        origin: 'USA',
        vaccineImage: defaultVaccine,
      },
      {
        id: 3,
        name: 'AstraZeneca',
        origin: 'UK',
        vaccineImage: defaultVaccine,
      },
      {
        id: 4,
        name: 'Johnson & Johnson',
        origin: 'USA',
        vaccineImage: defaultVaccine,
      },
    ],
    [],
  );

  useFocusEffect(
    useCallback(() => {
      const shuffled = [...vaccine].sort(() => 0.5 - Math.random());
      setRandomVaccines(shuffled.slice(0, 2));
    }, [vaccine]),
  );

  const renderItem = ({item}) => (
    <Vaccine name={item.name} origin={item.origin} image={item.vaccineImage} />
  );

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          style={{width: horizontalScale(200), height: horizontalScale(200)}}
          source={require('../../assets/images/Loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <CustomTitle
        title="Vaccination"
        icon={<Noti width={horizontalScale(18)} height={horizontalScale(18)} />}
      />
      <FlatList
        data={randomVaccines}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {
    flexGrow: 1,
    marginHorizontal: horizontalScale(15),
    marginTop: verticalScale(25),
    padding: horizontalScale(5),
    paddingBottom: verticalScale(20),
  },
  subFunction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    marginTop: verticalScale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  listTitle: {
    fontSize: scaleFontSize(15),
    fontFamily: getFontFamily(600, ''),
    color: '#000',
    lineHeight: verticalScale(20),
  },
  seeMore: {
    fontFamily: getFontFamily(500, ''),
    fontSize: scaleFontSize(11),
    color: '#FF8533',
    lineHeight: verticalScale(20),
  },
});

export default Vaccination;
