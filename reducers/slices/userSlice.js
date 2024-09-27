import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDob: (state, action) => {
      state.dob = action.payload;
    },
    setUser: (state, action) => {
      // Update the entire state with the passed object
      return {...state, ...action.payload};
    },
    reset: state => {
      state.name = initialState.name;
      state.dob = initialState.dob;
    },
  },
});

export const {setName, setDob, reset, setUser} = userSlice.actions;

export default userSlice.reducer;
