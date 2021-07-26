import handleJWT from '../../api/jwt-fetch';

import { getJWTdata, getJWTtoken } from '../../utils/jwt-parser';
import { calculateRemainingTime } from '../../utils/token-expire';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, JWT_PARSE, JWT_REMOVE } from '../actions/actionTypes';
import { fetchLogout } from './logoutActions';

export const fetchLoginStart = () => ({ type: LOGIN_START });

export const fetchLoginSuccess = (token) => ({ type: LOGIN_SUCCESS, token });

export const fetchLoginFailure = (e) => ({ type: LOGIN_FAILURE, error: e.message });

export const parseJWT = (data) => ({ type: JWT_PARSE , data });

export const clearJWT = () => ({ type: JWT_REMOVE });

export const fetchLoginData = (data) => (dispatch, getState) => {
  const auth = getState();

  if (auth && (auth.loading || auth.error)) {
    return;
  }

  dispatch(fetchLoginStart());

  return Promise.resolve(data)
    .then(handleJWT({login: data.email , password: data.password})
      .then(() => dispatch(parseJWT(getJWTdata())))
      .then(() => dispatch(fetchLoginSuccess(getJWTtoken())))
      .then(() => setTimeout(() => dispatch(fetchLogout()), calculateRemainingTime()))
      .catch((e) => dispatch(fetchLoginFailure(e))));
};
