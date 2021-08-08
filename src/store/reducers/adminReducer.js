import { REQUEST_QUESTIONS_LIST } from '../actions/actionTypes';

const initialState = {
  testsList: []
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS_LIST:
      return Object.assign({}, state, {
        testsList: action.testsList,
      });
    default:
      return state;
  }
};
