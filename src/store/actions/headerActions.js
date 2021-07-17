import getLoginData from '../../components/login/dataTunk';

import { LANGUAGE_RUSSIAN, LANGUAGE_ENGLISH } from '../actions/actionTypes';

import { LOGOUT_START } from '../actions/actionTypes';

import { USER_DEFAULT, USER_ADMIN, USER_HR, USER_COACH } from '../actions/actionTypes';

export const changeToRussian = () => ({ type: LANGUAGE_RUSSIAN });

export const changeToEnglish = () => ({ type: LANGUAGE_ENGLISH });

export const logoutStart = () => ({ type: LOGOUT_START });

export const roleHr = () => ({ type: USER_HR });

export const roleAdmin = () => ({ type: USER_ADMIN });

export const roleDefault = () => ({ type: USER_DEFAULT });

export const roleCoach = () => ({ type: USER_COACH });

export const fetchLogout = () => (dispatch, getState) => {
  const auth = getState();
  if (auth && (auth.isAuth)) {
    return;
  }
  return getLoginData({})
    .then(() => dispatch(logoutStart()));
};
