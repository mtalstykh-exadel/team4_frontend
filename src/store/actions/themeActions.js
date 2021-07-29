import { THEME_CHANGE } from "./actionTypes";

export const themeChange = (darktheme) => {
  const body = document.getElementsByTagName('body')[0];
  if (darktheme) {
    body.setAttribute('data-theme', 'dark');
  } else {
    body.removeAttribute('data-theme');
  }
  return { type: THEME_CHANGE, darktheme };
};
