import {combineReducers} from 'redux';

import auth from './reducers/auth';
import period from './reducers/period';
import optionsSlice from './slices/optionSlice';
import comic from './reducers/comics';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  period,
  comic,
});

export default rootReducer;
