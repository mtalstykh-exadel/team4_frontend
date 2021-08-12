import { REQUEST_UNVERIFIED_TESTS, REQUEST_REPORTS } from '../actions/actionTypes';

export const unverifiedTestsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_UNVERIFIED_TESTS:
      return action.filteredEmployees;
    default:
      return state;
  }
};

export const reportsReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_REPORTS:
      return action.filteredEmployees;
    default:
      return state;
  }
};
