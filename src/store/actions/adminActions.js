import { getUnverifiedTests } from '@api/unverifiedTests-fetch';
import { REQUEST_TESTS_FOR_DISTRIBUTION } from './actionTypes';

export const setTestList = (testsList) => ({ type: REQUEST_TESTS_FOR_DISTRIBUTION, testsList });

export const requestQuestionsList = (pageNum, pageSize) => async (dispatch) => {
  return getUnverifiedTests(pageNum, pageSize)
    .then((response) => dispatch(setTestList(response)));
};
