import { THEME_CHANGE } from "./actionTypes";

export const themeChange = (theme) => {
  const body = document.getElementsByTagName('body')[0];
  localStorage.setItem('theme', theme);
  body.setAttribute('theme', theme);
  return { type: THEME_CHANGE, theme };
};
