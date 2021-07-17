import getLoginData from '../../components/login/dataTunk';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';
import { setProfileData } from './profileActions';

export const fetchLoginStart = () => ({ type: LOGIN_START });

export const fetchLoginSuccess = (data) => ({ type: LOGIN_SUCCESS, data });

export const fetchLoginFailure = (e) => ({ type: LOGIN_FAILURE, error: e.message });

export const fetchLoginData = (dt) => (dispatch, getState) => {
  const auth = getState();
  if (auth && (auth.loading || auth.error)) {
    return;
  }
  dispatch(fetchLoginStart(dt));
  return getLoginData(dt)
    .then((authData) => {
      dispatch(fetchLoginSuccess(authData));
      debugger;
      dispatch(setProfileData(null, 'Ivan Ivanov', 'frontend developer', dt.email));
    })
    .catch((e) => dispatch(fetchLoginFailure(e)));
};
