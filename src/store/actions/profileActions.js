import getUserTests from '../../api/user-tests';
import { SET_USER_TESTS_HISTORY } from './actionTypes';

export const setProfileData = (testsHistory) => ({
  type: SET_USER_TESTS_HISTORY, testsHistory
});

export const requestUserTestsHistory = () => async (dispatch) => {
  const data = await getUserTests();

  dispatch(setProfileData(data));
};
