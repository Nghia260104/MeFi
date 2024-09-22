import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Comics from '../screens/Comics/Comics';

const ComicsNavigator = () => {
  const ComicsStack = createStackNavigator();
  return (
    <ComicsStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ComicsStack.Screen name="Comics" component={Comics} />
    </ComicsStack.Navigator>
  );
};

export default ComicsNavigator;
