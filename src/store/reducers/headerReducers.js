import { LANGUAGE_RUSSIAN, LANGUAGE_ENGLISH } from '../actions/actionTypes';
import { USER_DEFAULT, USER_ADMIN, USER_HR, USER_COACH } from '../actions/actionTypes';

const languageReducer = (state = 'english', action) => {
  switch (action.type) {
    case LANGUAGE_RUSSIAN: return Object.assign({}, state, {language: 'russian'});
    case LANGUAGE_ENGLISH: return Object.assign({}, state, {language: 'english'});
    default: return state;
  }
};

const roleReducer = (state = 'default', action) => {
  switch (action.type) {
    case USER_DEFAULT: return 'default';
    case USER_HR: return 'hr';
    case USER_ADMIN: return 'admin';
    case USER_COACH: return 'coach';
    default: return state;
  }
};

export {languageReducer, roleReducer };
