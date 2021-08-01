import { SET_USER_TESTS_HISTORY } from "../actions/actionTypes";

const initialState = {
  testsHistory: []
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_TESTS_HISTORY:
      return Object.assign({}, state, {
        testsHistory: action.testsHistory
      });
    default:
      return state;
  }
};

export { profileReducer };
