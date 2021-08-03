import { SET_PROFILE_DATA } from '../actions/actionTypes';

const initialState = {
  avatar: null,
  occupation: null
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:
      return Object.assign({}, state, {
        avatar: action.avatar,
        occupation: action.occupation
      });
    default:
      return state;
  }
};

export { profileReducer };
