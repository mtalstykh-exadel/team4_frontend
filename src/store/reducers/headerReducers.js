import { LANGUAGE_RUSSIAN, LANGUAGE_ENGLISH } from '../actions/actionTypes';
import { USER_DEFAULT, USER_ADMIN, USER_HR, USER_COACH } from '../actions/actionTypes';

const languageReducer = (state = {type: 'english', short: 'EN'}, action) => {
  switch (action.type) {
    case LANGUAGE_RUSSIAN: return Object.assign({}, state, {type: 'russian', short: 'RU'});
    case LANGUAGE_ENGLISH: return Object.assign({}, state, {type: 'english', short: 'EN'});
    default: return state;
  }
};

const roleReducer = (state = 'admin', action) => {
  switch (action.type) {
    case USER_DEFAULT: return 'default';
    case USER_HR: return 'hr';
    case USER_ADMIN: return 'admin';
    case USER_COACH: return 'coach';
    default: return state;
  }
};

export {languageReducer, roleReducer };
