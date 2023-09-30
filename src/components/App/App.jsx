import React from "react";
import { Provider } from "react-redux";

import { UserInfo } from "../UserInfo";
import { createStore } from "../../redux/store";

const store = createStore();

export const App = () => (
  <Provider store={store}>
    <UserInfo />
  </Provider>
);
