import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Vaccination from '../screens/Vaccination/Vaccination';

const VaccineNavigator = () => {
  const VaccineStack = createStackNavigator();
  return (
    <VaccineStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <VaccineStack.Screen name="Vaccination" component={Vaccination} />
    </VaccineStack.Navigator>
  );
};

export default VaccineNavigator;
