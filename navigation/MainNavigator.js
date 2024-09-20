import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Onboarding from '../screens/Onboarding/Onboarding';
import Sex from '../screens/Sex/Sex';
import LogIn from '../screens/LogIn/LogIn';
import SignUp from '../screens/SignUp/SignUp';
import PeriodTrackerCalendar from '../screens/Calendar/Calendar';
import PeriodFrequency from '../screens/Calendar/Calendar2';
import TabNavigator from './TabNavigator';
import VerificationScreen from '../screens/Verification/VerificationScreen';
import Carousel2 from '../screens/Home/Carousel2';
import CycleJournal from '../screens/Home/CycleJournal';
import Personal from '../screens/PersonalInfo.js/Personal';
import Info from '../screens/PersonalInfo.js/Info';

const Stack = createStackNavigator();

const MainNavigator = alreadyLaunched => {
  return (
    <Stack.Navigator
      screenOptions={{header: () => null, headerShown: false}}
      initialRouteName={alreadyLaunched ? 'Sex' : 'Onboarding'}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Sex" component={Sex} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
      <Stack.Screen
        name="PeriodTrackerCalendar"
        component={PeriodTrackerCalendar}
      />
      <Stack.Screen name="PeriodFrequency" component={PeriodFrequency} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="Carousel2" component={Carousel2} />
      <Stack.Screen name="CycleJournal" component={CycleJournal} />
      <Stack.Screen name="Personal" component={Personal} />
      <Stack.Screen name="PersonalInfo" component={Info} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
