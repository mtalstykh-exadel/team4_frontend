import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT_START } from "../actions/actionTypes";

const initialState = {
  data: '',
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
        data: action.data,
        isAuth: true,
        loading: false,
        error: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        data: '',
        isAuth: false,
        loading: false,
        error: action.error
      });
    case LOGOUT_START:
      return {
        data: '',
        isAuth: false,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export { loginReducer };
