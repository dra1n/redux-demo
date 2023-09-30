import { useDispatch } from "react-redux";
import { update, initialize } from "../slices/userInfo";

export const useUserInfoBehavior = () => {
  const dispatch = useDispatch();

  return {
    update: ({ field, value }) => dispatch(update({ field, value })),
    initialize: () => dispatch(initialize())
  };
};
