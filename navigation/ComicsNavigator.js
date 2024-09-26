import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Comics from '../screens/Comics/Comics';
import ComicsDetail from '../screens/Comics/ComicsDetail/ComicsDetail';
import ReadingComics from '../screens/Comics/ReadingComics';

const ComicsNavigator = () => {
  const ComicsStack = createStackNavigator();
  return (
    <ComicsStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <ComicsStack.Screen name="Comics" component={Comics} />
      <ComicsStack.Screen name="ComicsDetail" component={ComicsDetail} />
      <ComicsStack.Screen name="ReadingComics" component={ReadingComics} />
    </ComicsStack.Navigator>
  );
};

export default ComicsNavigator;
