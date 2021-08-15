import { REQUEST_QUESTIONS_LIST, REQUEST_QUESTION, REMOVE_QUESTION, SET_EDITED_QUESTION, REMOVE_EDITED_QUESTION, SET_LISTENING_AUDIO_FILE } from './actionTypes';
import { addNewQuestion, getListeningAudioFile, getListeningQuestionsList, getQuestionsList, getSingleListeningQuestion, getSingleQuestion, sendEditedQuestion } from '../../api/questions-requests';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });
export const setQuestions = (question) => ({ type: REQUEST_QUESTION, question });
export const setEditedQuestion = (question) => ({ type: SET_EDITED_QUESTION, question });
export const setListeningAudioFile = (fileName) => ({ type: SET_LISTENING_AUDIO_FILE, fileName });
export const removeQuestionForEdit = () => ({ type: REMOVE_QUESTION });
export const removeEditedQuestion = () => ({ type: REMOVE_EDITED_QUESTION });


export const requestQuestionsList = (level, module) => async (dispatch) => {
  const data = await getQuestionsList(level, module);
  dispatch(setQuestionsList(data));
};

export const requestListeningQuestionsList = (level) => async (dispatch) => {
  const data = await getListeningQuestionsList(level);
  dispatch(setQuestionsList(data));
};

export const requestListeningTopic = (id) => async (dispatch) => {
  const data = await getSingleListeningQuestion(id);
  dispatch(setQuestions(data));
};

export const requestListeningAudioFile = (fileName) => async (dispatch) => {
  const data = await getListeningAudioFile(fileName);
  dispatch(setListeningAudioFile(data));
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

export const archiveQuestion = (questId) => (dispatch) => {
  // TODO make a request to the server for archiving
  console.log(questId);
  dispatch(requestQuestionsList());
};
