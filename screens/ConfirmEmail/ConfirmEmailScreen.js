import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {sendCode} from '../../actions/auth';
import {USER_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../component/customButton';
import CustomInput from '../../component/customInput';
import {checkEmail} from '../../actions/auth';
import {getFontFamily} from '../../assets/fonts/helper';

const ConfirmEmailScreen = () => {
  // const ConfirmEmailScreen = ({ navigation }) => {

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [accountError, setAccountError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setAccountError('Email is required');
      return;
    } else {
      setAccountError('');
      // Proceed with the email verification process
    }
    // handle check email here
    await dispatch(checkEmail(email));
    const storedData = await AsyncStorage.getItem(USER_KEY);
    console.log(storedData);
    if (!storedData) {
      return;
    }
    const res = JSON.parse(storedData);
    if (res?.message) {
      if (res?.message === 'User does not exist!') {
        setAccountError('User does not exist!');
      } else {
        await AsyncStorage.setItem('prevScreen', 'ForgotPassword');
        navigation.navigate('VerificationScreen');
        console.log('Email:', email);
        await dispatch(sendCode(email));
      }
    }
  };

  return (
    <View style={styles.submitContainer}>
      <Text style={styles.title}>Please input your email:</Text>
      <KeyboardAvoidingView behavior="padding" style={styles.email}>
        <CustomInput
          customStyle={styles.email}
          placeholder="Email"
          onChangeText={setEmail}
          error={accountError}
        />
      </KeyboardAvoidingView>
      <CustomButton
        customStyle={styles.button}
        title={'Continue to verify email'}
        onPress={handleSubmit}
        textColor={'#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  submitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: horizontalScale(20),
  },
  title: {
    color: '#000',
    fontSize: scaleFontSize(25),
    marginBottom: verticalScale(16),
    fontFamily: getFontFamily(600, ''),
  },
  email: {
    width: '100%',
  },
  button: {
    marginTop: verticalScale(20),
    width: horizontalScale(200),
    backgroundColor: '#FF8533',
  },
});

export default ConfirmEmailScreen;
