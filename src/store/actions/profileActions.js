import getUserTests from '../../api/user-tests';
import { SET_USER_TESTS_HISTORY } from './actionTypes';

export const setProfileData = (testsHistory) => ({
  type: SET_USER_TESTS_HISTORY, testsHistory
});

export const requestUserTestsHistory = (pageNum, pageSize) => async (dispatch) => {
  return getUserTests(pageNum, pageSize)
    .then((response) => dispatch(setProfileData(response)));
};
