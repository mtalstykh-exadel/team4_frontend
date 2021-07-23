import getLoginData from '../../components/login/dataTunk';
import handleJWT from '../../api/jwt-fetch';
import { getJWT, removeJWT } from '../../utils/jwt-parser';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, JWT_PARSE } from '../actions/actionTypes';

export const fetchLoginStart = () => ({ type: LOGIN_START });

export const fetchLoginSuccess = (token) => ({ type: LOGIN_SUCCESS, token });

export const fetchLoginFailure = (e) => ({ type: LOGIN_FAILURE, error: e.message });

export const dataJWT = (data) => ({ type: JWT_PARSE , data });

export const fetchLoginData = (data) => (dispatch, getState) => {
  const auth = getState();

  if (auth && (auth.loading || auth.error)) {
    return;
  }

  dispatch(fetchLoginStart());
  return getLoginData(data)
    .then(handleJWT({login: data.email , password: data.password})
      .then((token) => dispatch(fetchLoginSuccess(token)))
      .then(() => dispatch(dataJWT(getJWT())))
      .then(() => removeJWT())
      .catch((e) => dispatch(fetchLoginFailure(e))));
};
