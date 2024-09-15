import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {reducers} from './reducers';
import Splash from './screens/Splash/Splash';
import MainNavigator from './navigation/MainNavigator';

const store = configureStore({reducer: reducers});

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 5200);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {hideSplashScreen ? <MainNavigator /> : <Splash />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
