import { THEME_CHANGE } from "./actionTypes";

export const themeChange = (darktheme) => {
  return { type: THEME_CHANGE, darktheme };
};
