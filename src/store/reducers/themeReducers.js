import { THEME_CHANGE } from "../actions/actionTypes";

const themeReducer = ( state = false, action) => {
  switch (action.type) {
    case THEME_CHANGE: return action.darktheme;
    default: return state;
  }
};

export { themeReducer };
