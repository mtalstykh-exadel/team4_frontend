import getUnverifiedTests from '../../api/unverifiedTests-fetch';
import { REQUEST_TESTS_FOR_DISTRIBUTION } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_TESTS_FOR_DISTRIBUTION, testsList });

export const requestQuestionsList = () => async (dispatch) => {
  const data = await getUnverifiedTests();
  dispatch(setTestList(data));
};
