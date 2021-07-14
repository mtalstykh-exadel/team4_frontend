import { SET_PROFILE_DATA } from "../actions/actionTypes";

const initialState = {
	avatar: null,
	fullname: null,
	occupation: null,
	email: null
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_PROFILE_DATA:
			return Object.assign({}, state, {
				avatar: action.avatar,
				fullname: action.fullname,
				occupation: action.occupation,
				email: action.email
			});
		default:
			return state;
	}
};

export { profileReducer };
