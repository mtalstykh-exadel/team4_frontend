import { REQUEST_QUESTIONS_LIST } from './actionTypes';
import { Questions } from '../../components/EditTestsSelector/EditTestsData/mock-data-Questions';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });

export const requestQuestionsList = () => (dispatch) => {
  // make a request to the server for question list
  dispatch(setQuestionsList(Questions));
};

export const archiveQuestions = (questId) => (dispatch) => {
  // make a request to the server for archiving
  console.log(questId);
  dispatch(requestQuestionsList());
};
