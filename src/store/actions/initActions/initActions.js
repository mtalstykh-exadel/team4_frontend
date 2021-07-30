import { checkTokenTimeout } from '../checkTokenTimeout';
import { themeChange } from '../themeActions';

export const initApp = () => (dispatch) => {
  dispatch(checkTokenTimeout());

  const theme = localStorage.getItem('theme');
  !theme ? dispatch(themeChange('light')) : dispatch(themeChange(theme));
};
