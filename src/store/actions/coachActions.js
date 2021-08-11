import { REQUEST_QUESTIONS_LIST, REQUEST_QUESTION } from './actionTypes';
import { questions } from '../../components/EditTests/EditTestsTable/mock-data-Questions';
import { getSingleQuestion } from '../../api/questions-requests';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });
export const setQuestions = (question) => ({ type: REQUEST_QUESTION, question });

export const requestQuestionsList = () => (dispatch) => {
  // TODO make a request to the server for question list
  dispatch(setQuestionsList(questions));
};

export const requestQuestion = (id) => async (dispatch) => {
  const data = await getSingleQuestion(id);
  dispatch(setQuestions(data));
};

export const archiveQuestion = (questId) => (dispatch) => {
  // TODO make a request to the server for archiving
  console.log(questId);
  dispatch(requestQuestionsList());
};
