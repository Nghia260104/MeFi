import * as actionType from '../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '@env';

const authReducer = async (state = {authData: null}, action) => {
  switch (action.type) {
    case actionType.AUTH:
    case actionType.SEND_CODE:
    case actionType.VERIFY:
      await AsyncStorage.setItem(USER_KEY, JSON.stringify({...action.data}));

      return {...state, authData: action.data, loading: false, errors: null};
    case actionType.LOGOUT:
      await AsyncStorage.clear();

      return {...state, authData: null, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
