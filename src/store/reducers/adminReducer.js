import { REQUEST_QUESTION } from '../actions/actionTypes';

const initialState = {
  testsList: []
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTION:
      return Object.assign({}, state, {
        testsList: action.testsList,
      });
    default:
      return state;
  }
};
