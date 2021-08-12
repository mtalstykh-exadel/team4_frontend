//import { rows } from '../../testData/rowsForAdminDistribution';
import getUnverifiedTests from '../../api/unverifiedTests-fetch';
import { REQUEST_TESTS_FOR_DISTRIBUTION } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_TESTS_FOR_DISTRIBUTION, testsList });

export const requestQuestionsList = () => async (dispatch) => {
  // TODO make a request to the server for question list
  const data = await getUnverifiedTests();
  dispatch(setTestList(data));
};
