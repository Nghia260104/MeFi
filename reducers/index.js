import {combineReducers} from 'redux';

import auth from './reducers/auth';
import period from './reducers/period';
import optionsSlice from './slices/optionSlice';

const rootReducer = combineReducers({
  auth,
  options: optionsSlice,
  period,
});

export default rootReducer;
