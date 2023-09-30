/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: ""
};

export const storageName = "userInfo";

export const initialize = createAsyncThunk(
  "userInfo/initialize",
  (_, { extra: { localStorageService }, dispatch }) => {
    const initialValue = JSON.parse(localStorageService.getItem(storageName));

    if (initialValue) {
      dispatch(init(initialValue));
    }
  }
);

export const update = createAsyncThunk(
  "userInfo/update",
  (
    { field, value },
    { extra: { localStorageService }, dispatch, getState }
  ) => {
    dispatch(updateField({ field, value }));

    const { userInfo } = getState();

    localStorageService.setItem(storageName, JSON.stringify(userInfo));
  }
);

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    init: (state, { payload }) => {
      Object.keys(payload).forEach(field => {
        state[field] = payload[field];
      });
    },

    updateField: (state, { payload }) => {
      state[payload.field] = payload.value;
    }
  }
});

export const { updateField, init } = userInfoSlice.actions;

export const userInfoSliceReducer = userInfoSlice.reducer;
