import { REQUEST_UNVERIFIED_TESTS } from '../actions/actionTypes';

const initialState = {
  tests: []
};

export const unverifiedTestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_UNVERIFIED_TESTS:
      return Object.assign({}, state, {
        tests: action.filteredEmployees,
      });
    default:
      return state;
  }
};
