import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
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
import ConfirmEmailScreen from '../ConfirmEmail/ConfirmEmailScreen';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {sendCode, signIn} from '../../actions/auth';

import {USER_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  statusCodes,
  isErrorWithCode,
  GoogleSignin,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import {setName, setUser} from '../../reducers/slices/userSlice';

const LogIn = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [accountError, setAccountError] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };
    await dispatch(signIn(data));

    // Handle data response
    const storedData = await AsyncStorage.getItem(USER_KEY);
    if (!storedData) {
      // Handle log in failed
      console.log('LogIn: storedData is null');
      return;
    }
    const res = JSON.parse(storedData);
    // In res, there must be a token, a user block with user profile
    // console.log(res.token); // If token exists, logged in successfully.
    // if(res?.message){
    //   console.log('Error: ');
    //   console.log(res.message);
    // }
    setPasswordError('');
    setAccountError('');
    if (res?.message) {
      if (res.message === 'Invalid credentials!') {
        setPasswordError('Invalid credentials!');
      } else if (res.message === 'User does not exist!') {
        setAccountError('User does not exist!');
      }
    }

    if (res?.token) {
      // handle user co verified chua
      dispatch(setUser(res.user));
      // neu verified roi thi
      // navigation.navigate(PeriodTrackerCalendar);
      if (res?.user.name) {
        dispatch(setName(res?.user.name));
      }
      if (!res?.user.verified) {
        navigation.navigate('VerificationScreen');
        await dispatch(sendCode(email));
        return;
      }

      if (!res?.user.period_start) {
        navigation.navigate('PeriodTrackerCalendar');
        return;
      }

      if (!res?.user.period_type) {
        navigation.navigate('PeriodFrequency');
        return;
      }

      navigation.navigate('Main');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        // read user's info
        await dispatch(
          signIn({email: response.data.user.email, type: 'Google'}),
        );
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.ONE_TAP_START_FAILED:
            // Android-only, you probably have hit rate limiting.
            // You can still call `presentExplicitSignIn` in this case.
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android: play services not available or outdated
            // Web: when calling an unimplemented api (requestAuthorization)
            break;
          default:
          // something else happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const {width: SCREEN_WIDTH} = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <ScrollView>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ConfirmEmailScreen);
              }}>
              <Text style={styles.forgot}>Forgot password</Text>
            </TouchableOpacity>
          </View>
          <CustomButton
            customStyle={{
              marginTop: verticalScale(40),
              height: verticalScale(50),
            }}
            title="Log In"
            onPress={() => {
              handleSubmit();
              // navigation.navigate(PeriodTrackerCalendar);
            }}
            textColor={'white'}
          />
          <View style={styles.signUpContainer}>
            <Text style={styles.dontHaveAccount}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={styles.signUp}> Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.alternativeLogin}>
            <TouchableOpacity
              onPress={() => {
                handleGoogleSignIn();
              }}>
              <Google width={horizontalScale(30)} height={verticalScale(30)} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Facebook
                width={horizontalScale(30)}
                height={verticalScale(30)}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Apple width={horizontalScale(30)} height={verticalScale(30)} />
            </TouchableOpacity>
          </View>
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
    fontFamily: getFontFamily(400, ''),
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
    fontFamily: getFontFamily(600, ''),
    fontSize: scaleFontSize(12),
    color: '#8A7B7B',
  },
  signUp: {
    marginLeft: horizontalScale(10),
    fontFamily: getFontFamily(600, ''),
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
