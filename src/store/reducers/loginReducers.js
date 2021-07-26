import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT_START } from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  loading: false,
  error: false
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
        email: '',
        password: '',
        isAuth: false,
        loading: false,
        error: true
      });
    case LOGOUT_START:
      return {
        email: '',
        password: '',
        isAuth: false,
        loading: false,
        error: ''
      };
    default:
      return state;
  }
};

export { loginReducer };
