import getLoginData from '../../components/login/dataTunk';
import handlejwt from '../../utils/jwt-fetch';
import { getJWT } from '../../utils/jwt-parser';

import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';

const url = 'https://untitled-testing-system.herokuapp.com/login';

export const fetchLoginStart = () => ({ type: LOGIN_START });

export const fetchLoginSuccess = (data) => ({ type: LOGIN_SUCCESS, data });

export const fetchLoginFailure = (e) => ({ type: LOGIN_FAILURE, error: e.message });

export const fetchLoginData = (data) => (dispatch, getState) => {
  const auth = getState();

  if (auth && (auth.loading || auth.error)) {
    return;
  }

  dispatch(fetchLoginStart());
  return getLoginData(data)
    .then(handlejwt(url, {login: data.email , password: data.password})
      .then(() => dispatch(fetchLoginSuccess(getJWT())))
      .catch((e) => dispatch(fetchLoginFailure(e))));
};
