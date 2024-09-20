import * as actionType from '../../constants/comicTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state = {comic: null}, action) => {
  switch (action.type) {
    case actionType.COMIC:
      AsyncStorage.setItem('comics', JSON.stringify({...action?.data}));

      return {...state, comic: action.data, loading: false, errors: null};
    default:
      return state;
  }
};

export default authReducer;
