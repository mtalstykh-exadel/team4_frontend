import { LANGUAGE_CHANGE } from '../actions/actionTypes';
import { THEME_CHANGE } from '../actions/actionTypes';

const languageReducer = (state = 'english', action) => {
  switch (action.type) {
    case LANGUAGE_CHANGE: return action.language;
    default: return state;
  }
};

const themeReducer = ( state = 'false', action) => {
  switch (action.type) {
    case THEME_CHANGE: return action.darktheme;
    default: return state;
  }
};

const roleReducer = (state = 'admin', action) => {
  switch (action.type) {
    default: return state;
  }
};

export {languageReducer, roleReducer, themeReducer};
