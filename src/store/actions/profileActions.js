import { SET_PROFILE_DATA } from './actionTypes';

export const setProfileData = (avatar, fullname, occupation, email) => ({
	type: SET_PROFILE_DATA, avatar, fullname, occupation, email
});
