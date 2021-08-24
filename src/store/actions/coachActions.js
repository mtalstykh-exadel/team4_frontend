import {
  REQUEST_QUESTIONS_LIST, REQUEST_QUESTION, REMOVE_QUESTION, REMOVE_EDITED_QUESTION, REMOVE_QUESTION_LIST
} from './actionTypes';
import {
  addNewListeningQuestion,
  getListeningQuestionsList, getQuestionsList, getSingleListeningQuestion, getSingleQuestion, requestToArchiveAndDearchive,
  requestToArchiveAndDearchiveListening, sendEditedListeningQuestion, sendNewAudio,
} from '@api/questions-requests';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });
export const setQuestions = (question) => ({ type: REQUEST_QUESTION, question });
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

export const addListeningQuestion = (file, question) => async () => {
  const data = await sendNewAudio(file);
  if (data) {
    const newQuestion = {
      ...question,
      url: data
    };
    addNewListeningQuestion(newQuestion);
  }
};

export const editListeningQuestion = (file, question) => async () => {
  const data = await sendNewAudio(file);
  if (data) {
    const newQuestion = {
      ...question,
      url: data
    };
    sendEditedListeningQuestion(newQuestion);
  }
};

export const requestQuestion = (id) => async (dispatch) => {
  const data = await getSingleQuestion(id);
  dispatch(setQuestions(data));
};

export const archiveQuestion = (Id, available, level, module, status, page, rowsPerPage) => async (dispatch) => {
  if (module === 'LISTENING') {
    await requestToArchiveAndDearchiveListening(Id, available);
    setTimeout(dispatch(requestListeningQuestionsList(level, status, page, rowsPerPage)), 10);
  } else {
    await requestToArchiveAndDearchive(Id, available);
    setTimeout(dispatch(requestQuestionsList(level, module, status, page, rowsPerPage)), 10);
  }
};
