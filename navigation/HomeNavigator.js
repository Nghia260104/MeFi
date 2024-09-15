import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/Home';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
