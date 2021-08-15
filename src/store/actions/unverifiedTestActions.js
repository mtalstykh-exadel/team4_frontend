import { REQUEST_UNVERIFIED_TESTS, REQUEST_REPORTS } from './actionTypes';
import { getUnverifiedTests, getReports } from '../../api/unverifiedTests-fetch';

export const setUnverifiedTests = (filteredEmployees) => ({ type: REQUEST_UNVERIFIED_TESTS, filteredEmployees });

export const setReports = (filteredEmployees) => ({ type: REQUEST_REPORTS, filteredEmployees });

export const requestUnverifiedTests = () => (dispatch) => {
  return getUnverifiedTests()
    .then((data) => (dispatch(setUnverifiedTests(data))));
};

export const requestReports = (testId) => (dispatch) => {
  return getReports(testId)
    .then((data) => (dispatch(setReports(data))));
};
