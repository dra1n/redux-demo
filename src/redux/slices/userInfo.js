/* eslint-disable no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: ""
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    init: (state, { payload }) => {
      Object.keys(payload).forEach(field => {
        state[field] = payload[field];
      });
    },

    update: (state, { payload }) => {
      state[payload.field] = payload.value;
    }
  }
});

export const { update, init } = userInfoSlice.actions;

export const userInfoSliceReducer = userInfoSlice.reducer;
