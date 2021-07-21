import { LANGUAGE_CHANGE } from '../actions/actionTypes';

const languageReducer = (state = 'english', action) => {
  switch (action.type) {
    case LANGUAGE_CHANGE: return action.language;
    default: return state;
  }
};

export {languageReducer };
