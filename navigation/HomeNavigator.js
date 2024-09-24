import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home/Home';
import Carousel2 from '../screens/Home/Carousel2';
import CycleJournal from '../screens/Home/CycleJournal';
import Personal from '../screens/PersonalInfo.js/Personal';
import Info from '../screens/PersonalInfo.js/Info';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Carousel2" component={Carousel2} />
      <HomeStack.Screen name="CycleJournal" component={CycleJournal} />
      <HomeStack.Screen name="Personal" component={Personal} />
      <HomeStack.Screen name="PersonalInfo" component={Info} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
