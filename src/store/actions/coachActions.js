import {
  REQUEST_QUESTIONS_LIST, REQUEST_QUESTION, REMOVE_QUESTION, SET_EDITED_QUESTION, REMOVE_EDITED_QUESTION,
  REMOVE_QUESTION_LIST
} from './actionTypes';
import {
  addNewQuestion, getListeningQuestionsList, getQuestionsList,
  getSingleListeningQuestion, getSingleQuestion, requestToArchiveQuestion, sendEditedQuestion
} from '../../api/questions-requests';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });
export const setQuestions = (question) => ({ type: REQUEST_QUESTION, question });
export const setEditedQuestion = (question) => ({ type: SET_EDITED_QUESTION, question });
export const removeQuestionForEdit = () => ({ type: REMOVE_QUESTION });
export const removeEditedQuestion = () => ({ type: REMOVE_EDITED_QUESTION });
export const removeQuestionsList = () => ({ type: REMOVE_QUESTION_LIST });


export const requestQuestionsList = (level, module, status, pageNum, pageSize) => async (dispatch) => {
  const data = await getQuestionsList(level, module, status, pageNum, pageSize);
  dispatch(setQuestionsList(data));
};

export const requestListeningQuestionsList = (level, status, pageNum, pageSize) => async (dispatch) => {
  const data = await getListeningQuestionsList(level, status, pageNum, pageSize);
  dispatch(setQuestionsList(data));
};

export const requestListeningTopic = (id) => async (dispatch) => {
  const data = await getSingleListeningQuestion(id);
  dispatch(setQuestions(data));
};

export const requestQuestion = (id) => async (dispatch) => {
  const data = await getSingleQuestion(id);
  dispatch(setQuestions(data));
};

export const editQuestion = (question) => async (dispatch) => {
  const data = await sendEditedQuestion(question);
  dispatch(setEditedQuestion(data));
};

export const requestToAddNewQuestion = (question) => async (dispatch) => {
  const data = await addNewQuestion(question);
  dispatch(setEditedQuestion(data));
};

export const archiveQuestion = (Id, level, module) => async (dispatch) => {
  await requestToArchiveQuestion(Id);
  dispatch(requestQuestionsList(level, module));
};
