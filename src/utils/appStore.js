import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Make sure the path is correct
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer, // userReducer is the default export from userSlice
    feed: feedReducer,
    connections: connectionReducer,
  },
});

export default appStore;
