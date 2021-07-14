import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS } from "../actions/actionTypes";

const initialState = {
	isAuth: false,
	loading: false,
	error: ''
};

const loginReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_START:
			return Object.assign({}, state, {
				loading: true,
				error: false
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isAuth: true,
				loading: false,
				error: false
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				data: null,
				loading: false,
				error: true
			});
		default:
			return state;
	}
};

export { loginReducer };
