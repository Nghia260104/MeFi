import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {Provider} from 'react-redux';
import Splash from './screens/Splash/Splash';
import MainNavigator from './navigation/MainNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from './store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 6100);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} />
      <GestureHandlerRootView>
        <NavigationContainer>
          {hideSplashScreen ? <MainNavigator /> : <Splash />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
