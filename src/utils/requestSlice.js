import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    // Fixed typo from 'reuducers' to 'reducers'
    addRequests: (state, action) => {
      return action.payload; // Ensure you're returning the payload
    },
    removeRequests: (state, action) => {
      const newArray = state.filter((r) => r._id !== action.payload);
      return newArray;
    },
  },
});

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer;
