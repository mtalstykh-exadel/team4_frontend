import { tokenTimeout } from '../tokenTimeout';
import { themeChange } from '../themeActions';

export const initApp = () => (dispatch) => {
  dispatch(tokenTimeout());

  const theme = localStorage.getItem('theme');
  theme ? dispatch(themeChange('light')) : dispatch(themeChange(theme));
};
