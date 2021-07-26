import { getJWTtoken } from "../../utils/jwt-parser";

import { LOGIN_FAILURE, LOGIN_START, LOGIN_SUCCESS, LOGOUT_START } from "../actions/actionTypes";

const initialToken = getJWTtoken();
const authentication = !!initialToken;

const initialState = {
  token: initialToken,
  isAuth: authentication,
  loading: false,
  error: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return Object.assign({}, state, {
        loading: true,
        error: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.token,
        isAuth: true,
        loading: false,
        error: false
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        token: '',
        isAuth: false,
        loading: false,
        error: action.error
      });
    case LOGOUT_START:
      return {
        token: '',
        isAuth: false,
        loading: false,
        error: false
      };
    default:
      return state;
  }
};

export { authReducer };
