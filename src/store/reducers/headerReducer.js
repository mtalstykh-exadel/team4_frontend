import { REQUEST_NOTIFICATIONS } from '../actions/actionTypes';

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case REQUEST_NOTIFICATIONS:
      return action.notifications;
    default:
      return state;
  }
};

export { notificationReducer };
