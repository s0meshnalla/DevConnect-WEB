import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure the path is correct
import feedReducer from "./feedSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer, // userReducer is the default export from userSlice
    feed: feedReducer,
  },
});

export default appStore;
