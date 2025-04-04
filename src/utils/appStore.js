// appStore.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure the path is correct

const appStore = configureStore({
  reducer: {
    user: userReducer, // userReducer is the default export from userSlice
  },
});

export default appStore;
