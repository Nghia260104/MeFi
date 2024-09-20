import * as actionType from '../../constants/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case actionType.GLOBAL_VACCINES:
    case actionType.SET_VACCINE:
    case actionType.GET_VACCINE:
    case actionType.DELETE_VACCINE:
      AsyncStorage.setItem('Vaccines', JSON.stringify({...action?.data}));

      return {...state, authData: action.data, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
