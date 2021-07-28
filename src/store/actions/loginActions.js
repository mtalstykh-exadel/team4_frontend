import handleJWT from '../../api/jwt-fetch';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, JWT_ADD, JWT_REMOVE } from '../actions/actionTypes';
import { getJWTdata, getJWTtoken, removeJWTfromLocalstorage } from '../../utils/jwt-parser';
import { tokenTimeout } from './tokenTimeout';

export const fetchLoginStart = () => {
  return { type: LOGIN_START };
};

export const fetchLoginSuccess = () => {
  const token = getJWTtoken();
  return { type: LOGIN_SUCCESS, token };
};

export const fetchLoginFailure = (e) => {
  return { type: LOGIN_FAILURE, error: e.message };
};

export const addJWT = () => {
  const data = getJWTdata();
  return { type: JWT_ADD, data };
};

export const removeJWT = () => {
  removeJWTfromLocalstorage();
  return { type: JWT_REMOVE };
};

export const fetchLoginData = (data) => (dispatch, getState) => {
  const auth = getState();
  if (auth.auth.isAuth && (auth.auth.loading || auth.auth.error)) {
    return;
  }
  dispatch(fetchLoginStart());
  return Promise.resolve(data)
    .then(handleJWT({ login: data.email, password: data.password })
      .then(() => dispatch(addJWT()))
      .then(() => dispatch(fetchLoginSuccess()))
      .then(() => dispatch(tokenTimeout()))
      .catch((e) => dispatch(fetchLoginFailure(e))));

};
