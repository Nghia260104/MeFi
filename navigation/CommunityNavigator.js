import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Community from '../screens/Community/Community';
import Post from '../screens/Community/Post';
import Save from '../screens/Community/Save';

const CommunityNavigator = () => {
  const CommunityStack = createStackNavigator();
  return (
    <CommunityStack.Navigator
      screenOptions={{header: () => null, headerShown: false}}>
      <CommunityStack.Screen name="Community" component={Community} />
      <CommunityStack.Screen name="Post" component={Post} />
      <CommunityStack.Screen name="Save" component={Save} />
    </CommunityStack.Navigator>
  );
};

export default CommunityNavigator;
