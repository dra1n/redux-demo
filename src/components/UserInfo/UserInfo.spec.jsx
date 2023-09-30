import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { UserInfo, storageName } from "./UserInfo";
import { createStore } from "../../redux/store";

const setupLocalStorageMock = (mocks = {}) => {
  const localStorageMock = {
    getItem: jest.fn().mockImplementation(() => "null"),
    setItem: jest.fn(),
    ...mocks
  };

  Object.keys(localStorageMock).forEach(method => {
    Storage.prototype[method] = localStorageMock[method];
  });
};

const renderComponent = (props = {}) =>
  render(
    <Provider store={createStore()}>
      <UserInfo {...props} />
    </Provider>
  );

beforeEach(setupLocalStorageMock);

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

    setupLocalStorageMock({
      getItem: jest.fn().mockImplementation(() => JSON.stringify(initialValue))
    });

    const { getByRole } = renderComponent();

    const nameField = getByRole("textbox", { name: /name/i });
    const emailField = getByRole("textbox", { name: /email/i });

    expect(nameField.value).toEqual(name);
    expect(emailField.value).toEqual(email);
  });

  it("does not fail when data is empty", () => {
    setupLocalStorageMock({
      getItem: jest.fn().mockImplementation(() => "null")
    });

    const { getByRole } = renderComponent();

    const nameField = getByRole("textbox", { name: /name/i });
    const emailField = getByRole("textbox", { name: /email/i });

    expect(nameField.value).toEqual("");
    expect(emailField.value).toEqual("");
  });

  it("updates external data source", () => {
    const inputEmail = "example@ss.com";
    const setItem = jest.fn();

    setupLocalStorageMock({
      setItem
    });

    const { getByRole } = renderComponent();

    const emailField = getByRole("textbox", { name: /email/i });

    fireEvent.change(emailField, { target: { value: inputEmail } });

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(
      storageName,
      JSON.stringify({ name: "", email: inputEmail })
    );
  });
});
