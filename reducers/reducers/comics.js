// import * as actionType from '../../constants/comicTypes';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const authReducer = (state = {comic: null}, action) => {
//   switch (action.type) {
//     case actionType.COMIC:
//       AsyncStorage.setItem('comics', JSON.stringify({...action?.data}));

//       return {...state, comic: action.data, loading: false, errors: null};
//     default:
//       return state;
//   }
// };

// export default authReducer;

import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for storing selected options and day
const initialState = {
  comics: [],
};

// Create a slice for options with reducers to handle actions
export const comicsSlice = createSlice({
  name: 'comics',
  initialState: initialState,
  reducers: {
    setComics: (state, action) => {
      state.comics = action.payload;
    },

    reset: () => {
      return initialState;
    },
  },
});

// Export the actions for use in components
export const {setComics, reset} = comicsSlice.actions;

// Export the reducer to be included in the Redux store
export default comicsSlice.reducer;
