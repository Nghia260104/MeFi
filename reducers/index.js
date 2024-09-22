import {combineReducers} from 'redux';

import auth from './reducers/auth';
import period from './reducers/period';
import optionsSlice from './slices/optionSlice';
import comic from './reducers/comics';
import profileImageSlice from './slices/profileImage';
import checkSlice from './slices/checkSlice';
import vaccines from './reducers/vaccines';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  period,
  comic,
  image: profileImageSlice,
  check: checkSlice,
  vaccines: vaccines,
  user: userSlice,
});

export default rootReducer;
