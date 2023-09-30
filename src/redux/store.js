import { configureStore } from "@reduxjs/toolkit";
import { userInfoSliceReducer } from "./slices/userInfo";

export const createStore = () =>
  configureStore({
    reducer: {
      userInfo: userInfoSliceReducer
    }
  });
