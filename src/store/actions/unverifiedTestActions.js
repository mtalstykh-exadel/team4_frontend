import { REQUEST_UNVERIFIED_TESTS } from './actionTypes';
import getUnverifiedTests from '../../api/unverifiedTests-fetech';

export const setUnverifiedTests = (filteredEmployees) => ({ type: REQUEST_UNVERIFIED_TESTS, filteredEmployees });

export const requestUnverifiedTests = () => (dispatch) => {
  getUnverifiedTests()
    .then((data) => (dispatch(setUnverifiedTests(data))));
};
