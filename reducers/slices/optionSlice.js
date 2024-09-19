import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for storing selected options and day
const initialState = {
  selectedOptions: [],
  day: 1,
};

// Create a slice for options with reducers to handle actions
export const optionsSlice = createSlice({
  name: 'options',
  initialState: initialState,
  reducers: {
    // Reducer to set the selected options
    setOptions: (state, action) => {
      state.selectedOptions = action.payload;
    },

    // Reducer to reset to the initial state
    resetOptions: () => {
      return initialState;
    },

    // New reducer to set the day
    setDay: (state, action) => {
      state.day = action.payload;
    },

    // New reducer to clear selected options
    clearSelectedOptions: state => {
      state.selectedOptions = [];
    },
  },
});

// Export the actions for use in components
export const {setOptions, resetOptions, setDay, clearSelectedOptions} =
  optionsSlice.actions;

// Export the reducer to be included in the Redux store
export default optionsSlice.reducer;
