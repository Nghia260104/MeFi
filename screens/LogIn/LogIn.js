import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';  // Import useDispatch from react-redux
import asyncStorage from '@react-native-async-storage/async-storage';  // Ensure asyncStorage is imported
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
import SignUp from '../SignUp/SignUp';
import {useNavigation} from '@react-navigation/native';
import PeriodTrackerCalendar from '../Calendar/Calendar';

import {signIn} from '../../actions/auth.js';  // Import signIn from auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const [accountError, setAccountError] = useState('');
  
  const dispatch = useDispatch();

  const handleSubmit = async() => {
    const data = {
      email,
      password,
    };
    console.log(`LogIn Screen: You have just click the LogIn Button right?`);
    AsyncStorage.clear();
    await dispatch(signIn(data));
    const storedData = await asyncStorage.getItem('UsERToKEn');
    if (storedData){
      const data = JSON.parse(storedData);
      console.log(data);
    }
  };
    // try {
    //   const response = await dispatch(signIn(data));
    //   const storedData = await asyncStorage.getItem('UsERToKEn');
    //   if (storedData) {
    //     const parsedData = JSON.parse(storedData);
    //     console.log(parsedData);
    //     navigation.navigate('PeriodTrackerCalendar');
    //   } else {
    //     console.log('No stored data found');
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     setAccountError('Not exist account');
    //   } else if (error.response && error.response.status === 400) {
    //     setPasswordError('Password incorrect');
    //   } else {
    //     console.error('Error in handleSubmit:', error);
    //   }
    // }

  // const handleSubmit = async () => {
  //   const data = {
  //     email,
  //     password,
  //   };
  //   console.log('LogIn Screen: You have just clicked the LogIn Button right?');
  //   try {
  //     const response = await dispatch(signIn(data));
  //     console.log('Response from signIn:', response);
  
  //     if (response && response.data) {
  //       const { token, result } = response.data;
  //       await asyncStorage.setItem('UsERToKEn', JSON.stringify({ token, user: result }));
  //       navigation.navigate('PeriodTrackerCalendar');
  //     } else {
  //       if (response && response.response) {
  //         if (response.response.status === 404) {
  //           setAccountError('Not exist account');
  //         } else if (response.response.status === 400) {
  //           setPasswordError('Password incorrect');
  //         } else {
  //           console.error('Error in handleSubmit:', response);
  //         }
  //       } else {
  //         console.error('Unexpected error in handleSubmit:', response);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in handleSubmit:', error);
  //   }
  // };

  // const handleSubmit = async () => {
  //   const data = {
  //     email,
  //     password,
  //   };
  //   console.log('LogIn Screen: You have just clicked the LogIn Button right?');
  //   try {
  //     const response = await dispatch(signIn(data));
  //     console.log('Response from signIn:', response);
  
  //     if (response && response.data) {
  //       const { token, result } = response.data;
  //       await asyncStorage.setItem('UsERToKEn', JSON.stringify({ token, user: result }));
  //       navigation.navigate('PeriodTrackerCalendar');
  //     } else {
  //       if (response && response.error && response.error.response) {
  //         if (response.error.response.status === 404) {
  //           setAccountError('Not exist account');
  //         } else if (response.error.response.status === 400) {
  //           setPasswordError('Password incorrect');
  //         } else {
  //           console.error('Error in handleSubmit:', response.error);
  //         }
  //       } else {
  //         console.error('Unexpected error in handleSubmit:', response);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error in handleSubmit:', error);
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <Logo width={SCREEN_WIDTH * 0.25} height={SCREEN_WIDTH * 0.25} />
        <CustomInput
          customStyle={styles.email}
          placeholder="Email"
          onChangeText={setEmail}
          error={accountError}
        />
        <CustomInput
          customStyle={styles.password}
          placeholder="Password"
          onChangeText={setPassword}
          error={passwordError}
          secureTextEntry={true}
        />
        <View style={styles.forgotButton}>
          <TouchableWithoutFeedback>
            <Text style={styles.forgot}>Forgot password</Text>
          </TouchableWithoutFeedback>
        </View>
        <CustomButton
          customStyle={{
            marginTop: verticalScale(40),
            height: verticalScale(50),
          }}
          title="Log In"
          onPress={() => {
            handleSubmit();
            // if(1){
            //   setAccountError('Invalid email or password');
            // }
            // else {
            //   navigation.navigate(PeriodTrackerCalendar);
            // }
          }}
        />
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccount}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SignUp);
            }}>
            <Text style={styles.signUp}> Sign Up</Text>
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
  email: {
    marginTop: verticalScale(70),
    width: '100%',
  },
  password: {
    marginTop: verticalScale(14),
    width: '100%',
  },
  forgotButton: {
    width: '100%',
    marginTop: verticalScale(10),
  },
  forgot: {
    position: 'absolute',
    right: horizontalScale(2),
    fontFamily: getFontFamily('FZ Poppins', 400, ''),
    fontSize: scaleFontSize(12),
    color: '#00164A',
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
    //zIndex: -1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(32),
  },
});

export default LogIn;
