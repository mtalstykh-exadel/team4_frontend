import { REQUEST_QUESTIONS_LIST, REQUEST_QUESTION } from '../actions/actionTypes';

const initialState = {
  questions: null,
  question: null
};

export const coachReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUESTIONS_LIST:
      return Object.assign({}, state, {
        questions: action.questions,
      });
    case REQUEST_QUESTION:
      return Object.assign({}, state, {
        question: action.question,
      });
    default:
      return state;
  }
};
