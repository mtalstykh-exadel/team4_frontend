import { rows } from '../../testData/rowsForAdminDistribution';
import { REQUEST_QUESTION } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_QUESTION, testsList });

export const requestQuestionsList = () => (dispatch) => {
  // TODO make a request to the server for question list
  dispatch(setTestList(rows));
};
