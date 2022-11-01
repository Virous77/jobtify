import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import jobSlice from "./jobSlice";
import allJobSlice from "./allJobSlice";

const store = configureStore({
  reducer: {
    users: userSlice,
    createJob: jobSlice,
    allJobs: allJobSlice,
  },
});

export default store;
