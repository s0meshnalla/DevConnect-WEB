// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      return action.payload; // Set user to the payload
    },
    removeUser: () => {
      return null; // Remove user (set to null)
    },
  },
});

// Export the actions so you can dispatch them later
export const { addUser, removeUser } = userSlice.actions;

// Export the reducer as the default export
export default userSlice.reducer;
