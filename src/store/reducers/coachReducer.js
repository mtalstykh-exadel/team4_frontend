import { REQUEST_QUESTIONS_LIST } from '../actions/actionTypes';

const initialState = {
  questions: null
};

export const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS_LIST:
      return Object.assign({}, state, {
        questions: action.questions,
      });
    default:
      return state;
  }
};
