import { REQUEST_QUESTIONS_LIST, REQUEST_QUESTION, REMOVE_QUESTION, SET_EDITED_QUESTION, REMOVE_EDITED_QUESTION, SET_LISTENING_AUDIO_FILE } from '../actions/actionTypes';

const initialState = {
  questions: null,
  question: null,
  addingQuestionSuccess: null,
  editedQuestion: null,
  audioFile: null
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
    case SET_EDITED_QUESTION:
      return Object.assign({}, state, {
        editedQuestion: action.question,
      });
    case SET_LISTENING_AUDIO_FILE:
      return Object.assign({}, state, {
        audioFile: action.fileName,
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
