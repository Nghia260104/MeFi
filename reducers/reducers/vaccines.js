// import * as actionType from '../../constants/actionTypes';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const authReducer = (state = {vaccines: null}, action) => {
//   switch (action.type) {
//     case actionType.GLOBAL_VACCINES:
//     case actionType.SET_VACCINE:
//     case actionType.GET_VACCINE:
//     case actionType.DELETE_VACCINE:
//       AsyncStorage.setItem('Vaccines', JSON.stringify({...action?.data}));

//       return {...state, vaccines: action.data, loading: false, errors: null};
//     default:
//       return state;
//   }
// };

// export default authReducer;

import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  globalVaccines: null,
  vaccines: null,
  error: null,
};

export const vaccinesSlice = createSlice({
  name: 'vaccines',
  initialState: initialState,
  reducers: {
    getGlobalVaccines: (state, action) => {
      state.globalVaccines = action.payload;
      console.log(action.payload);
    },

    resetGlobalVaccines: state => {
      state.globalVaccines = null;
    },

    setVaccines: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
        return state;
      }
      state.vaccines = action.payload;
    },

    resetVaccines: state => {
      state.vaccines = null;
    },

    reset: () => {
      return initialState;
    },
  },
});

export const {
  getGlobalVaccines,
  resetGlobalVaccines,
  setVaccines,
  resetVaccines,
  reset,
} = vaccinesSlice.actions;

export default vaccinesSlice.reducer;
