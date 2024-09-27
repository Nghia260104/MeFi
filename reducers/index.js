import {combineReducers} from 'redux';

import auth from './reducers/auth';
import optionsSlice from './slices/optionSlice';
import profileImageSlice from './slices/profileImage';
import checkSlice from './slices/checkSlice';
import vaccines from './reducers/vaccines';
import userSlice from './slices/userSlice';
import comics from './reducers/comics';
import genderSlice from './slices/genderSlice';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  comic: comics,
  image: profileImageSlice,
  check: checkSlice,
  vaccines: vaccines,
  user: userSlice,
  gender: genderSlice,
});

export default rootReducer;
