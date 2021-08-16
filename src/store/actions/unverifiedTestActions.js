import { REQUEST_UNVERIFIED_TESTS, REQUEST_UNVERIFIED_TEST, REQUEST_GRADES } from './actionTypes';
import { getUnverifiedTests, getUnverifiedTest, getTestGrades } from '../../api/unverifiedTests-fetch';

export const setUnverifiedTests = (unverifiedTests) => ({ type: REQUEST_UNVERIFIED_TESTS, unverifiedTests });

export const setReports = (test) => ({ type: REQUEST_UNVERIFIED_TEST, test });

export const setGrades = (grades) => ({ type: REQUEST_GRADES, grades });

export const requestUnverifiedTests = () => (dispatch) => {
  return getUnverifiedTests()
    .then((data) => (dispatch(setUnverifiedTests(data))));
};

export const requestReports = (testId) => (dispatch) => {
  return getUnverifiedTest(testId)
    .then((data) => (dispatch(setReports(data))));
};

export const requestGrades = (testId) => (dispatch) => {
  return getTestGrades(testId)
    .then((data) => (dispatch(setGrades(data))));
};
