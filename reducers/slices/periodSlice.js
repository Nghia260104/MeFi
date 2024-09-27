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
    setSlicePeriodRange: (state, action) => {
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

    setSlicePeriodType: (state, action) => {
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
  setSlicePeriodRange,
  setSlicePeriodType,
  resetPeriodRange,
  resetPeriodType,
  reset,
  setNextPeriod,
} = periodSlice.actions;

// Export the reducer to be included in the Redux store
export default periodSlice.reducer;
