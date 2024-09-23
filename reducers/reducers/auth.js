import * as actionType from '../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '@env';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case actionType.AUTH:
    case actionType.SEND_CODE:
    case actionType.VERIFY:
    case actionType.RESET_PASSWORD:
    case actionType.CHECK_EMAIL:
      AsyncStorage.setItem(USER_KEY, JSON.stringify({...action?.data}));

      return {...state, authData: action.data, loading: false, errors: null};
    case actionType.LOGOUT:
      AsyncStorage.removeItem(USER_KEY);

      return {...state, authData: null, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
