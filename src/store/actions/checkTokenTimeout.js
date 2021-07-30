import { getJWTdata } from "../../utils/jwt-parser";
import { logoutActions } from "./logoutActions";

export const checkTokenTimeout = () => (dispatch, getState) => {
  const state = getState();
  const calculateAuthTime = () => {
    const currentTime = new Date().getTime() / 1000;
    const adjExpirationTime = new Date(getJWTdata().exp);
    const remainingTime = (adjExpirationTime - currentTime) * 1000;

    return remainingTime <= 30000 ? 0 : remainingTime;
  };

  if (state.auth.isAuth) {
    setTimeout(() => dispatch(logoutActions()), calculateAuthTime());
  }
};
