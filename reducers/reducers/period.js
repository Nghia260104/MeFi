// import * as periodType from '../../constants/periodTypes.js';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {USER_KEY} from '@env';

// const periodReducer = (state = {period: null}, action) => {
//     switch (action.type) {
//         case periodType.PERIOD_TRACKER:
//         case periodType.PERIOD_TYPE:
//             AsyncStorage.setItem(USER_KEY, JSON.stringify({...action?.data}));

//             return {...state, period: action.data, loading: false, errors: null};
//         default:
//             return state;
//     }

// };

// export default periodReducer;

import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for storing selected options and day
const initialState = {
  period_start: null,
  period_end: null,
  period_type: null,
  next_period: null,
};

// Create a slice for options with reducers to handle actions
export const periodSlice = createSlice({
  name: 'period',
  initialState: initialState,
  reducers: {
    setPeriodRanges: (state, action) => {
      state.period_start = action.payload.period_start;
      state.period_end = action.payload.period_end;
    },

    setNextPeriod: (state, action) => {
      state.next_period = action.payload;
    },

    resetPeriodRange: state => {
      state.period_start = null;
      state.period_end = null;
    },

    setPeriodTypes: (state, action) => {
      state.period_type = action.payload;
    },

    reset: () => {
      return initialState;
    },

    resetPeriodType: state => {
      state.period_type = null;
    },
  },
});

// Export the actions for use in components
export const {
  setPeriodRanges,
  setPeriodTypes,
  resetPeriodRange,
  resetPeriodType,
  reset,
  setNextPeriod,
} = periodSlice.actions;

// Export the reducer to be included in the Redux store
export default periodSlice.reducer;
