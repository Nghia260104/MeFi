import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomTitle from '../../component/customTitle';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {ScrollView} from 'react-native-gesture-handler';
import {getFontFamily} from '../../assets/fonts/helper';
import CustomCategory from '../../component/customCategory';

import Report from '../../assets/images/Personal/Report.svg';
import Cycle from '../../assets/images/Personal/Cycle.svg';
import Setting from '../../assets/images/Personal/Setting.svg';
import Support from '../../assets/images/Personal/Support.svg';
import CustomButton from '../../component/customButton';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPencil} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import * as actionType from '../../constants/actionTypes.js';
import {differenceInYears} from 'date-fns';

const Personal = () => {
  let width = useWindowDimensions().width;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  const calculateAge = dob => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    return differenceInYears(currentDate, birthDate);
  };

  const age = calculateAge(user.dob);

  const handleLogout = () => {
    dispatch({type: actionType.LOGOUT});
    navigation.navigate('LogIn');
  };

  const profileImage = useSelector(state => state.image.profileImage);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <CustomTitle goBack={true} title="Information" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <View style={styles.background} />
          <View
            style={[
              styles.avatarContainer,
              {left: (width - horizontalScale(40)) / 2 - horizontalScale(70)},
            ]}>
            <Image
              style={styles.avatar}
              source={
                typeof profileImage === 'string'
                  ? {uri: profileImage}
                  : profileImage
              }
              resizeMode="cover"
            />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <TouchableOpacity
              style={styles.edit}
              onPress={() => navigation.navigate('PersonalInfo')}>
              <FontAwesomeIcon
                icon={faPencil}
                size={scaleFontSize(15)}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.info}>Female - {age} years old</Text>
          <View style={styles.cateContainer}>
            <CustomCategory
              icon={
                <Report
                  width={horizontalScale(18)}
                  height={verticalScale(16)}
                />
              }
              title="Graph & Reports"
            />
            <CustomCategory
              icon={
                <Cycle
                  width={horizontalScale(18)}
                  height={horizontalScale(18)}
                />
              }
              title="Cycle journal"
            />
            <CustomCategory
              icon={
                <Setting
                  width={horizontalScale(18)}
                  height={horizontalScale(18)}
                />
              }
              title="Settings"
            />
            <CustomCategory
              icon={
                <Support
                  width={horizontalScale(18)}
                  height={horizontalScale(18)}
                />
              }
              title="Help"
            />
          </View>
          <CustomButton
            customStyle={styles.button}
            title="Log out"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  userContainer: {
    flex: 1,
    marginHorizontal: horizontalScale(20),
    alignItems: 'center',
  },
  background: {
    width: '100%',
    borderRadius: horizontalScale(10),
    height: verticalScale(200),
    backgroundColor: '#FFDF99',
  },
  avatarContainer: {
    flex: 1,
    position: 'absolute',
    top: verticalScale(130),
    backgroundColor: '#FFDF99',
    borderRadius: horizontalScale(70),
  },
  avatar: {
    width: horizontalScale(140),
    height: horizontalScale(140),
    borderRadius: horizontalScale(70),
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(78),
    paddingHorizontal: horizontalScale(20),
  },
  edit: {
    position: 'absolute',
    right: 0,
  },
  name: {
    fontSize: scaleFontSize(20),
    fontFamily: getFontFamily(600, ''),
    color: '#000',
  },
  info: {
    fontSize: scaleFontSize(13),
    fontFamily: getFontFamily(500, ''),
    color: '#000',
  },
  cateContainer: {
    width: '100%',
    height: verticalScale(170),
    marginTop: verticalScale(10),
    justifyContent: 'space-around',
  },
  button: {
    width: horizontalScale(130),
    marginTop: verticalScale(30),
  },
});

export default Personal;
