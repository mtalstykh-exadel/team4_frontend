import getLoginData from '../../components/login/dataTunk';

import { LANGUAGE_CHANGE, THEME_CHANGE } from '../actions/actionTypes';

import { LOGOUT_START } from '../actions/actionTypes';

export const languageChange = (language) => ({ type: LANGUAGE_CHANGE, language });

export const themeChange = (darktheme) => ({ type: THEME_CHANGE, darktheme });

export const logoutStart = () => ({ type: LOGOUT_START });

export const fetchLogout = () => (dispatch, getState) => {
  const auth = getState();
  if (auth && (auth.isAuth)) {
    return;
  }
  return getLoginData({})
    .then(() => dispatch(logoutStart()));
};
