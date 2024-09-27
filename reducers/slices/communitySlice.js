import {createSlice} from '@reduxjs/toolkit';

// Define the initial state for storing selected options and day
const initialState = {
  blogs: [],
  comments: [],
};

// Create a slice for options with reducers to handle actions
export const communitySlice = createSlice({
  name: 'community',
  initialState: initialState,
  reducers: {
    setBlogs: (state, action) => {
        state.blogs = action.payload;
    },

    setComments: (state, action) => {
        state.comments = action.payload;
    },

    resetBlogs: (state) => {
        state.blogs = [];
    },

    resetComments: (state) => {
        state.comments = [];
    },

    reset: () => {
        return initialState;
    },
  },
});

// Export the actions for use in components
export const {
  setBlogs,
  setComments,
  resetBlogs,
  resetComments,
  reset,
} = communitySlice.actions;

// Export the reducer to be included in the Redux store
export default communitySlice.reducer;
