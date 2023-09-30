import { configureStore } from "@reduxjs/toolkit";
import { userInfoSliceReducer } from "./slices/userInfo";

export const createStore = (services = {}) =>
  configureStore({
    reducer: {
      userInfo: userInfoSliceReducer
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: { extraArgument: services }
      })
  });
