import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {getFontFamily} from '../../assets/fonts/helper';

import Logo from '../../assets/images/Logo.svg';
import Apple from '../../assets/images/Apple.svg';
import Facebook from '../../assets/images/Facebook.svg';
import Google from '../../assets/images/Google.svg';

import CustomInput from '../../component/customInput';
import CustomButton from '../../component/customButton';
import CustomDateInput from '../../component/customDateInput';
import LogIn from '../LogIn/LogIn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import PeriodTrackerCalendar from '../Calendar/Calendar';

import { useDispatch } from 'react-redux';
import { signUp } from '../../actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '@env';
import VerificationScreen from '../Verification/VerificationScreen';

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTick, setIsTick] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const data = {
      email,
      name,
      password,
      // Will need dob: <Date of birth input field>
    };
    console.log("SignUp: You have submitted the following data: ", data);
    await dispatch(signUp(data));

    // Handle data response
    const storedData = await AsyncStorage.getItem('UsERToKEn');
    if (!storedData) {
      // Handle log in failed
      return;
    }
    const res = JSON.parse(storedData); // In res, there must be a token, a user block with user profile
    navigation.navigate(VerificationScreen);
  };

  const {width: SCREEN_WIDTH} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <Logo width={SCREEN_WIDTH * 0.25} height={SCREEN_WIDTH * 0.25} />
        <CustomInput
          customStyle={styles.name}
          placeholder="Name"
          onChangeText={setName}
        />
        <CustomInput
          customStyle={styles.email}
          placeholder="Email"
          onChangeText={setEmail}
        />
        <CustomInput
          customStyle={styles.password}
          placeholder="Password"
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry={true}
        />
        <CustomDateInput customStyle={styles.dob} placeholder="Date of birth" />
        <View style={styles.consentContainer}>
          <TouchableOpacity
            style={styles.checkBox}
            onPress={() => {
              setIsTick(!isTick);
            }}>
            {isTick && (
              <FontAwesomeIcon
                icon={faCheck}
                color="#121619"
                size={scaleFontSize(14)}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.consent}>
            I would like to receive your newsletter and other promotional
            information.
          </Text>
        </View>
        <CustomButton
          customStyle={{
            marginTop: verticalScale(30),
            height: verticalScale(50),
          }}
          title="Sign Up"
          onPress={() => {
              handleSubmit();
            // navigation.navigate(PeriodTrackerCalendar);
          }}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccount}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(LogIn);
            }}>
            <Text style={styles.signUp}> Log in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.alternativeLogin}>
          <TouchableOpacity>
            <Google width={horizontalScale(30)} height={verticalScale(30)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Facebook width={horizontalScale(30)} height={verticalScale(30)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Apple width={horizontalScale(30)} height={verticalScale(30)} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(80),
    alignItems: 'center',
    marginHorizontal: horizontalScale(30),
  },
  name: {
    marginTop: verticalScale(25),
    width: '100%',
  },
  email: {
    marginTop: verticalScale(14),
    width: '100%',
  },
  password: {
    marginTop: verticalScale(14),
    width: '100%',
  },
  dob: {
    marginTop: verticalScale(14),
    width: '100%',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    marginTop: verticalScale(15),
  },
  dontHaveAccount: {
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
    fontSize: scaleFontSize(12),
    color: '#8A7B7B',
  },
  signUp: {
    marginLeft: horizontalScale(10),
    fontFamily: getFontFamily('FZ Poppins', 600, ''),
    fontSize: scaleFontSize(12),
    color: '#4D4D4D',
  },
  alternativeLogin: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(25),
  },
  consentContainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    width: '100%',
    alignItems: 'center',
  },
  checkBox: {
    borderWidth: 2,
    height: horizontalScale(16),
    width: verticalScale(16),
    borderRadius: 5,
  },
  consent: {
    marginLeft: horizontalScale(10),
    fontFamily: getFontFamily('FZ Poppins', 500, ''),
    fontSize: scaleFontSize(12),
    color: '#666666',
  },
});

export default SignUp;
