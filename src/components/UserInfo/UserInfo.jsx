/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import { useUserInfoBehavior, useUserInfoData } from "../../redux/hooks";

export const storageName = "userInfo";

export const UserInfo = () => {
  const { name, email } = useUserInfoData();
  const { initialize, update } = useUserInfoBehavior();

  useEffect(() => {
    initialize();
  }, []);

  const handleChange = field => e => {
    update({ field, value: e.target.value });
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
