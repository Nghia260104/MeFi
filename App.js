import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import Splash from './screens/Splash/Splash';
import MainNavigator from './navigation/MainNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './reducers/index';

const App = () => {
  const [alreadyLaunched, setAlreadyLaunched] = useState(null);

  const checkIfLaunched = async () => {
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value !== null) {
        setAlreadyLaunched(true);
      }
    } catch (error) {
      console.error('Error checking launch status:', error);
    }
  };

  useEffect(() => {
    checkIfLaunched();
  }, []);

  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 6100);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <NavigationContainer>
        {hideSplashScreen ? (
          <MainNavigator alreadyLaunched={alreadyLaunched} />
        ) : (
          <Splash />
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
