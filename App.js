import React from 'react';
import Sex from './screens/Sex/Sex';
import Onboarding from './screens/Onboarding/Onboarding';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LogIn from './screens/LogIn/LogIn';
import SignUp from './screens/SignUp/SignUp';
import PeriodTrackerCalendar from './screens/Calendar/Calendar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{header: () => null, headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Sex" component={Sex} />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="PeriodTrackerCalendar"
          component={PeriodTrackerCalendar}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
