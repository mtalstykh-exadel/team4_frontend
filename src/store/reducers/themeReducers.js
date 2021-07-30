import { THEME_CHANGE } from '../actions/actionTypes';

const themeReducer = ( state = '' , action) => {
  switch (action.type) {
    case THEME_CHANGE: return action.theme;
    default: return state;
  }
};

export { themeReducer };
