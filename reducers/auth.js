import * as actionType from '../constants/actionTypes';
import asyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case actionType.AUTH:
    case actionType.SEND_CODE:
    case actionType.VERIFY:
    asyncStorage.setItem('UsERToKEn', JSON.stringify({...action.data}));

      return {...state, authData: action.data, loading: false, errors: null};
    case actionType.LOGOUT:
      asyncStorage.clear();

      return {...state, authData: null, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
