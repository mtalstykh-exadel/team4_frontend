import { REQUEST_UNVERIFIED_TESTS, REQUEST_REPORTS } from './actionTypes';
import getUnverifiedTests from '../../api/unverifiedTests-fetech';

import getReports from '../../api/reports-fetch';

export const setUnverifiedTests = (filteredEmployees) => ({ type: REQUEST_UNVERIFIED_TESTS, filteredEmployees });

export const setReports = (filteredEmployees) => ({ type: REQUEST_REPORTS, filteredEmployees });

export const requestUnverifiedTests = () => (dispatch) => {
  getUnverifiedTests()
    .then((data) => (dispatch(setUnverifiedTests(data))));
};

export const requestReports = (testId) => (dispatch) => {
  getReports(testId)
    .then((data) => (dispatch(setReports(data))));
};
