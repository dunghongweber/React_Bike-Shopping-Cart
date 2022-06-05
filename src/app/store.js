import { configureStore } from "@reduxjs/toolkit";
import bikeReducer from "../features/bikes/bikeSlice";

export const store = configureStore({
  reducer: {
    bikes: bikeReducer,
  },
});
