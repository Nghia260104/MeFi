import AsyncStorage from '@react-native-async-storage/async-storage';

import {persistReducer, persistStore} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';

import {combineReducers} from 'redux';

import auth from './auth';
import optionsSlice from './optionSlice';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
});

const configuration = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'options'],
};

const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,

  // Using the getDefaultMiddleware function from the Redux Toolkit to add default middleware to the store
  // We're passing in an object with the serializableCheck key set to false to avoid serialization errors with non-serializable data
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
export const persistor = persistStore(store);
