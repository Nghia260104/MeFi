import {combineReducers} from 'redux';

import auth from './reducers/auth';
import period from './reducers/period';
import periodSlice from './slices/periodSlice';
import optionsSlice from './slices/optionSlice';
import comic from './reducers/comics';
import profileImageSlice from './slices/profileImage';
import checkSlice from './slices/checkSlice';
import vaccines from './reducers/vaccines';
import userSlice from './slices/userSlice';
import communitySlice from './slices/communitySlice';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  period,
  periodSlice: periodSlice,
  comic,
  image: profileImageSlice,
  check: checkSlice,
  vaccines: vaccines,
  user: userSlice,
  community: communitySlice,
});

export default rootReducer;
