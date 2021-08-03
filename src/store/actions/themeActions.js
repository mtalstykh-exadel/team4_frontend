import { THEME_CHANGE } from './actionTypes';

export const themeChange = (theme) => {
  localStorage.setItem('theme', theme);
  document.body.setAttribute('theme', theme);
  return { type: THEME_CHANGE, theme };
};
