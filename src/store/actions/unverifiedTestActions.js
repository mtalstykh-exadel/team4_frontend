import { REQUEST_UNVERIFIED_TESTS, REQUEST_UNVERIFIED_TEST, REQUEST_GRADES } from './actionTypes';
import { getTestsForVerification, getTestForVerification, getTestGrades } from '../../api/testsForVerification-fetch';

export const setUnverifiedTests = (unverifiedTests) => ({ type: REQUEST_UNVERIFIED_TESTS, unverifiedTests });

export const setReports = (test) => ({ type: REQUEST_UNVERIFIED_TEST, test });

export const setGrades = (grades) => ({ type: REQUEST_GRADES, grades });

export const requestUnverifiedTests = (pageNum, pageSize) => (dispatch) => {
  return getTestsForVerification(pageNum, pageSize)
    .then((data) => (dispatch(setUnverifiedTests(data))));
};

export const requestReports = (testId) => (dispatch) => {
  return getTestForVerification(testId)
    .then((data) => (dispatch(setReports(data))));
};

export const requestGrades = (testId) => (dispatch) => {
  return getTestGrades(testId)
    .then((data) => (dispatch(setGrades(data))));
};
