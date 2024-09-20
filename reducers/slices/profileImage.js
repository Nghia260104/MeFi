import {createSlice} from '@reduxjs/toolkit';

import defaultFemaleImage from '../../assets/images/defaultFemale.png';
// Define the initial state for storing the profile image
const initialState = {
  profileImage: defaultFemaleImage,
};

// Create a slice for profile image with reducers to handle actions
export const profileImageSlice = createSlice({
  name: 'profileImage',
  initialState: initialState,
  reducers: {
    // Reducer to set the profile image
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },

    // Reducer to clear the profile image
    clearProfileImage: state => {
      state.profileImage = null;
    },

    // Reducer to reset to the initial state
    resetProfileImage: () => {
      return initialState;
    },
  },
});

// Export the actions for use in components
export const {setProfileImage, clearProfileImage, resetProfileImage} =
  profileImageSlice.actions;

// Export the reducer to be included in the Redux store
export default profileImageSlice.reducer;
