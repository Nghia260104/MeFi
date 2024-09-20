import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for storing the check status
const initialState = {
  alreadyLaunched: false,
};

// Create a slice for the check with reducers to handle actions
export const checkSlice = createSlice({
  name: 'check',
  initialState: initialState,
  reducers: {
    // Reducer to set the alreadyLaunched status
    setAlreadyLaunched: (state, action) => {
      state.alreadyLaunched = action.payload;
    },
  },
});

export const {setAlreadyLaunched, setHideSplashScreen} = checkSlice.actions;

export default checkSlice.reducer;
