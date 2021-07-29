import { REQUEST_QUESTIONS_LIST } from './actionTypes';
import { questions } from '../../components/EditTestsSelector/EditTestsData/mock-data-Questions';

export const setQuestionsList = (questions) => ({ type: REQUEST_QUESTIONS_LIST, questions });

export const requestQuestionsList = () => (dispatch) => {
  // TODO make a request to the server for question list
  dispatch(setQuestionsList(questions));
};

export const archiveQuestion = (questId) => (dispatch) => {
  // TODO make a request to the server for archiving
  console.log(questId);
  dispatch(requestQuestionsList());
};
