import {
  REQUEST_QUESTIONS_LIST, REQUEST_QUESTION, REMOVE_QUESTION, REMOVE_EDITED_QUESTION, REMOVE_QUESTION_LIST
} from '@actions/actionTypes';

const initialState = {
  questions: null,
  question: null,
  addingQuestionSuccess: null,
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
    case REMOVE_QUESTION_LIST:
      return Object.assign({}, state, {
        questions: null,
      });
    case REMOVE_QUESTION:
      return Object.assign({}, state, {
        question: null,
      });
    case REMOVE_EDITED_QUESTION:
      return Object.assign({}, state, {
        editedQuestion: null,
      });
    default:
      return state;
  }
};
