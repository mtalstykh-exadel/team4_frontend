import { REQUEST_UNVERIFIED_TESTS, REQUEST_UNVERIFIED_TEST, REQUEST_GRADES } from '../actions/actionTypes';

export const unverifiedTestsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_UNVERIFIED_TESTS:
      return action.unverifiedTests;
    default:
      return state;
  }
};

export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_UNVERIFIED_TEST:
      return Object.assign({}, state, {
        test: action.test
      });
    case REQUEST_GRADES:
      return Object.assign({}, state, {
        grades: action.grades
      });
    default:
      return state;
  }
};
