import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: 'Minh Anh',
  dob: '2003-06-13',
};

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
    reset: state => {
      state.name = initialState.name;
      state.dob = initialState.dob;
    },
  },
});

export const {setName, setDob, reset} = userSlice.actions;

export default userSlice.reducer;
