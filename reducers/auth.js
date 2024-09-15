import * as actionType from '../constants/actionTypes';
import asyncStorage from '@react-native-async-storage/async-storage';

const authReducer = async(state = {authData: null}, action) => {
  switch (action.type) {
    case actionType.AUTH:
    case actionType.SEND_CODE:
    case actionType.VERIFY:
    await asyncStorage.setItem('UsERToKEn', JSON.stringify({...action.data}));

      return {...state, authData: action.data, loading: false, errors: null};
    case actionType.LOGOUT:
      await asyncStorage.clear();

      return {...state, authData: null, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
