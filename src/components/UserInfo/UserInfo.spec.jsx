import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { UserInfo, storageName } from "./UserInfo";
import { createStore } from "../../redux/store";

const defaultLocalStorageService = {
  getItem: () => "null",
  setItem: () => {}
};

const defaultServices = {
  localStorageService: defaultLocalStorageService
};

const renderComponent = (sevices = defaultServices) =>
  render(
    <Provider store={createStore(sevices)}>
      <UserInfo />
    </Provider>
  );

describe("UserInfo", () => {
  it("renders without an error", () => {
    renderComponent();
  });

  it("runs init with data", () => {
    const email = "example@gm.com";
    const name = "John";

    const initialValue = {
      name,
      email
    };

    const localStorageService = {
      ...defaultLocalStorageService,
      getItem: () => JSON.stringify(initialValue)
    };

    const { getByRole } = renderComponent({ localStorageService });

    const nameField = getByRole("textbox", { name: /name/i });
    const emailField = getByRole("textbox", { name: /email/i });

    expect(nameField.value).toEqual(name);
    expect(emailField.value).toEqual(email);
  });

  it("does not fail when data is empty", () => {
    const localStorageService = {
      ...defaultLocalStorageService,
      getItem: () => JSON.stringify(null)
    };

    const { getByRole } = renderComponent({ localStorageService });

    const nameField = getByRole("textbox", { name: /name/i });
    const emailField = getByRole("textbox", { name: /email/i });

    expect(nameField.value).toEqual("");
    expect(emailField.value).toEqual("");
  });

  it("updates external data source", () => {
    const setItem = jest.fn();
    const localStorageService = {
      ...defaultLocalStorageService,
      setItem
    };
    const inputEmail = "example@ss.com";

    const { getByRole } = renderComponent({ localStorageService });

    const emailField = getByRole("textbox", { name: /email/i });

    fireEvent.change(emailField, { target: { value: inputEmail } });

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(
      storageName,
      JSON.stringify({ name: "", email: inputEmail })
    );
  });
});
