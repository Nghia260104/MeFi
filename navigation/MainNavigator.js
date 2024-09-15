import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Onboarding from '../screens/Onboarding/Onboarding';
import Sex from '../screens/Sex/Sex';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';
import PeriodTrackerCalendar from '../screens/Calendar/Calendar';
import PeriodFrequency from '../screens/Calendar/Calendar2';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Sex" component={Sex} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
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
