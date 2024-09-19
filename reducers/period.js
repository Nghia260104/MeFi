import * as periodType from '../constants/periodTypes.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_KEY} from '@env';

const periodReducer = (state = {period: null}, action) => {
    switch (action.type) {
        case periodType.PERIOD_TRACKER:
        case periodType.PERIOD_TYPE:
            AsyncStorage.setItem(USER_KEY, JSON.stringify({...action?.data}));

            return {...state, period: action.data, loading: false, errors: null};
        default:
            return state;
    }

};

export default periodReducer;
