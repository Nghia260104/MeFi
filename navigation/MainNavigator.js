/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

import {USER_KEY} from '@env';
import Onboarding from '../screens/Onboarding/Onboarding';
import Sex from '../screens/Sex/Sex';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';
import PeriodTrackerCalendar from '../screens/Calendar/Calendar';
import PeriodFrequency from '../screens/Calendar/Calendar2';
import TabNavigator from './TabNavigator';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmail/ConfirmEmailScreen';
import ResetPassword from '../screens/ResetPassword/ResetPassword';
import LottieView from 'lottie-react-native';
import {horizontalScale} from '../assets/styles/scaling';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const alreadyLaunched = useSelector(state => state.check.alreadyLaunched);
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const data = await AsyncStorage.getItem(USER_KEY);
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.token) {
            setInitialRoute('Main');
          } else {
            setInitialRoute(alreadyLaunched ? 'Sex' : 'Onboarding');
          }
        } else {
          setInitialRoute(alreadyLaunched ? 'Sex' : 'Onboarding');
        }
      } catch (error) {
        console.error('Failed to fetch stored data:', error);
        setInitialRoute(alreadyLaunched ? 'Sex' : 'Onboarding');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoredData();
  }, [alreadyLaunched]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <LottieView
          style={{width: horizontalScale(200), height: horizontalScale(200)}}
          source={require('../assets/images/Loading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={initialRoute}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Sex" component={Sex} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="PeriodTrackerCalendar"
        component={PeriodTrackerCalendar}
      />
      <Stack.Screen name="PeriodFrequency" component={PeriodFrequency} />
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
