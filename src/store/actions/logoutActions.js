import { removeJWT } from '../../utils/jwt-parser';

import { LOGOUT_START } from './actionTypes';
import { clearJWT } from './loginActions';

export const logoutStart = () => ({ type: LOGOUT_START });

export const fetchLogout = () => (dispatch, getState) => {
  const auth = getState();
  if (auth && (auth.isAuth)) {
    return;
  }
  return Promise.resolve('')
    .then(() => dispatch(logoutStart()))
    .then(() => dispatch(clearJWT()))
    .then(removeJWT());
};
