import React from "react";
import { Provider } from "react-redux";

import { UserInfo } from "../UserInfo";
import { localStorageService } from "../../redux/services";
import { createStore } from "../../redux/store";

const store = createStore({ localStorageService });

export const App = () => (
  <Provider store={store}>
    <UserInfo />
  </Provider>
);
