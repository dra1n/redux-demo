import { useSelector } from "react-redux";

export const useUserInfoData = () => useSelector(({ userInfo }) => userInfo);
