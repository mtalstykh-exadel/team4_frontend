import { rows } from '../../testData/rowsForAdminDistribution';
import { REQUEST_QUESTIONS_LIST } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_QUESTIONS_LIST, testsList });

export const requestQuestionsList = () => (dispatch) => {
  // TODO make a request to the server for question list
  dispatch(setTestList(rows));
};
