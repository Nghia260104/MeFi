import {combineReducers} from 'redux';

import auth from './auth';
import period from './period';

export const reducers = combineReducers({auth, period});
