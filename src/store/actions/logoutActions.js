import { LOGOUT_START } from './actionTypes';
import { removeJWT } from './loginActions';

export const logoutStart = () => {
  return { type: LOGOUT_START };
};

export const logoutActions = () => (dispatch, getState) => {
  const auth = getState();
  if (auth && (auth.isAuth)) {
    return;
  }
  return Promise.resolve()
    .then(() => dispatch(logoutStart()))
    .then(() => dispatch(removeJWT()));
};
