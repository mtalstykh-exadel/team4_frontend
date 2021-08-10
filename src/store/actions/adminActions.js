import { rows } from '../../testData/rowsForAdminDistribution';
import { REQUEST_TESTS_FOR_DISTRIBUTION } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_TESTS_FOR_DISTRIBUTION, testsList });

export const requestQuestionsList = () => (dispatch) => {
  // TODO make a request to the server for question list
  dispatch(setTestList(rows));
};
