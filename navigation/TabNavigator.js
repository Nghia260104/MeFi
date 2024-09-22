/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../assets/styles/scaling';
import {getFontFamily} from '../assets/fonts/helper';

import HomeNavigator from './HomeNavigator';
import VaccineNavigator from './VaccineNavigator';
import ComicsNavigator from './ComicsNavigator';
import CommunityNavigator from './CommunityNavigator';
import RowComponent from '../component/RowComponent';

// Import SVGs as React components
import UnselectedHome from '../assets/images/Tabs/unselectedHome.svg';
import SelectedHome from '../assets/images/Tabs/selectedHome.svg';
import UnselectedVaccine from '../assets/images/Tabs/unselectedVaccine.svg';
import SelectedVaccine from '../assets/images/Tabs/selectedVaccine.svg';
import UnselectedComics from '../assets/images/Tabs/unselectedComics.svg';
import SelectedComics from '../assets/images/Tabs/selectedComics.svg';
import UnselectedCommunity from '../assets/images/Tabs/unselectedCommunity.svg';
import SelectedCommunity from '../assets/images/Tabs/selectedCommunity.svg';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: verticalScale(82), // Sets the height of the tab bar
          justifyContent: 'center', // Centers the tabs
          alignItems: 'center',
        },
        tabBarIcon: ({focused}) => {
          let IconComponent;
          let label;

          if (route.name === 'HomeNavigator') {
            IconComponent = focused ? SelectedHome : UnselectedHome;
            label = 'Home';
          } else if (route.name === 'VaccineNavigator') {
            IconComponent = focused ? SelectedVaccine : UnselectedVaccine;
            label = 'Vaccine';
          } else if (route.name === 'ComicsNavigator') {
            IconComponent = focused ? SelectedComics : UnselectedComics;
            label = 'Comics';
          } else if (route.name === 'CommunityNavigator') {
            IconComponent = focused ? SelectedCommunity : UnselectedCommunity;
            label = 'Social';
          }

          return (
            <View style={style.tabContainer}>
              <RowComponent
                styles={{
                  alignItems: 'center',
                  borderRadius: 44,
                  borderWidth: focused ? 2 : 0, // Adds border width when focused
                  borderColor: focused ? '#FF8533' : 'transparent', // Applies border color
                }}>
                <IconComponent width={24} height={24} />
                {focused && <Text style={style.tabLabel}>{label}</Text>}
              </RowComponent>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{headerTitle: 'Home'}}
      />
      <Tab.Screen
        name="VaccineNavigator"
        component={VaccineNavigator}
        options={{headerTitle: 'Vaccination'}}
      />
      <Tab.Screen
        name="ComicsNavigator"
        component={ComicsNavigator}
        options={{headerTitle: 'Comics'}}
      />
      <Tab.Screen
        name="CommunityNavigator"
        component={CommunityNavigator}
        options={{headerTitle: 'Community'}}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  tabContainer: {
    flex: 1, // Ensures equal space for each tab
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: scaleFontSize(12),
    color: '#FF8533',
    fontFamily: getFontFamily('FZ Poppins', 500, ''),
    lineHeight: scaleFontSize(14),
    paddingHorizontal: horizontalScale(4),
  },
});

export default TabNavigator;
