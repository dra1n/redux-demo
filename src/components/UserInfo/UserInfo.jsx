import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, init } from "../../redux/slices/userInfo";

export const storageName = "userInfo";

export const UserInfo = () => {
  const { name, email } = useSelector(state => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const initialValue = JSON.parse(localStorage.getItem(storageName));

    if (initialValue) {
      dispatch(init(initialValue));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = field => e => {
    dispatch(update({ field, value: e.target.value }));

    localStorage.setItem(
      storageName,
      JSON.stringify({ name, email, [field]: e.target.value })
    );
  };

  return (
    <>
      <div>
        <label htmlFor="name">
          Name{" "}
          <input
            value={name}
            onChange={handleChange("name")}
            id="name"
            type="text"
            name="name"
          />
        </label>
      </div>
      <div>
        <label htmlFor="email">
          Email{" "}
          <input
            value={email}
            onChange={handleChange("email")}
            id="email"
            type="text"
            name="email"
          />
        </label>
      </div>
    </>
  );
};
