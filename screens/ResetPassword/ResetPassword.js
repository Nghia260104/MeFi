import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/styles/scaling';
import LogIn from '../LogIn/LogIn';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {USER_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../component/customButton';
import CustomInput from '../../component/customInput';
import {resetPassword} from '../../actions/auth';
import {getFontFamily} from '../../assets/fonts/helper';

const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [cfpassword, setCfpassword] = useState('');
  const [checkPassword, setCheckPassword] = useState(false);
  const [accountError, setAccountError] = useState('');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Navigate to the screen you want
        navigation.navigate('LogIn');
        // Return true to prevent default back behavior
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );

  useEffect(() => {
    if (password === '' || cfpassword === '') {
      setCheckPassword(false);
    } else {
      if (password !== cfpassword) {
        setCheckPassword(true);
      } else {
        setCheckPassword(false);
      }
    }
  }, [password, cfpassword]);

  const handleSubmit = async () => {
    const encryptedLoadedData = await AsyncStorage.getItem(USER_KEY);
    const loadedData = JSON.parse(encryptedLoadedData);
    const email = loadedData.user.email;
    console.log('Email:', email);
    console.log('Password:', password);
    await dispatch(resetPassword(email, password));
    const storedData = await AsyncStorage.getItem(USER_KEY);
    if (!storedData) {
      console.log('No stored data');
      return;
    }
    const res = JSON.parse(storedData);
    if (res?.message) {
      console.log('Message:', res.message);
      if (res?.message === 'User not found!') {
        setAccountError('User not found!');
      } else {
        console.log('Password:', password);
        navigation.navigate(LogIn);
      }
    } else {
      console.log('Message is null?');
    }
    console.log('Stored data: pass');
  };

  return (
    <View style={styles.submitContainer}>
      <Text style={styles.title}>Input your new password:</Text>
      <CustomInput
        customStyle={styles.password}
        placeholder="New Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        error={accountError}
      />
      <View style={styles.cfpass}>
        <CustomInput
          customStyle={styles.password}
          placeholder="Confirm New Password"
          onChangeText={setCfpassword}
          secureTextEntry={true}
          error={accountError}
        />
        {checkPassword ? (
          <Text style={styles.check}>The password doesn't match</Text>
        ) : null}
      </View>
      <CustomButton
        customStyle={styles.button}
        title={'Reset password'}
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
    paddingHorizontal: horizontalScale(30),
  },
  title: {
    color: '#000',
    fontSize: scaleFontSize(24),
    marginBottom: verticalScale(16),
    fontWeight: 'bold',
    textAlign: 'left',
  },
  password: {
    marginBottom: 16,
    width: '100%',
    paddingVertical: 10,
  },
  button: {
    marginTop: verticalScale(20),
    width: horizontalScale(160),
    height: verticalScale(50),
    backgroundColor: '#FF8533',
  },
  cfpass: {
    width: '100%',
  },
  check: {
    color: 'red',
    paddingLeft: 12,
    position: 'absolute',
    fontSize: scaleFontSize(12),
    fontFamily: getFontFamily(400, ''),
    bottom: 0,
  },
});

export default ResetPassword;
