import getLoginData from '../../components/LoginForm/dataTunk';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';
import { setProfileData } from './profileActions';

export const fetchLoginStart = () => ({ type: LOGIN_START });

export const fetchLoginSuccess = (data) => ({ type: LOGIN_SUCCESS, data });

export const fetchLoginFailure = (e) => ({ type: LOGIN_FAILURE, error: e.message });

export const fetchLoginData = (data) => (dispatch, getState) => {
  const auth = getState();
  if (auth.login.isAuth && (auth.login.loading || auth.login.error)) {
    return;
  }
  dispatch(fetchLoginStart(data));
  return getLoginData(data)
    .then((authData) => {
      dispatch(fetchLoginSuccess(authData));
      dispatch(setProfileData(null, 'Ivan Ivanov', 'frontend developer', data.email));
    })
    .catch((e) => dispatch(fetchLoginFailure(e)));
};
