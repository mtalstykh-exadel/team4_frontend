import { REQUEST_UNVERIFIED_TESTS, REQUEST_REPORTS } from './actionTypes';
import { getUnverifiedTests, getReports } from '../../api/unverifiedTests-fetch';

export const setUnverifiedTests = (unverifiedTests) => ({ type: REQUEST_UNVERIFIED_TESTS, unverifiedTests });

export const setReports = (testReports) => ({ type: REQUEST_REPORTS, testReports });

export const requestUnverifiedTests = () => (dispatch) => {
  return getUnverifiedTests()
    .then((data) => (dispatch(setUnverifiedTests(data))));
};

export const requestReports = (testId) => (dispatch) => {
  return getReports(testId)
    .then((data) => (dispatch(setReports(data))));
};
