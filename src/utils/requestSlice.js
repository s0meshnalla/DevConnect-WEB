import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    // Fixed typo from 'reuducers' to 'reducers'
    addRequests: (state, action) => {
      return action.payload; // Ensure you're returning the payload
    },
  },
});

export const { addRequests } = requestSlice.actions;
export default requestSlice.reducer;
