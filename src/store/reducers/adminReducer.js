import { REQUEST_TESTS_FOR_DISTRIBUTION } from '@actions/actionTypes';

const initialState = {
  testsList: []
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TESTS_FOR_DISTRIBUTION:
      return Object.assign({}, state, {
        testsList: action.testsList,
      });
    default:
      return state;
  }
};
