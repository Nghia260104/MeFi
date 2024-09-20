import {combineReducers} from 'redux';

import auth from './reducers/auth';
import period from './reducers/period';
import optionsSlice from './slices/optionSlice';
import profileImageSlice from './slices/profileImage';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  period,
  image: profileImageSlice,
});

export default rootReducer;
