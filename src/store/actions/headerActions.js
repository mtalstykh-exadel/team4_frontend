import { REQUEST_NOTIFICATIONS } from './actionTypes';
import { getNotifications, deleteNotification } from '../../api/notifications';
// import { getNotifications } from '../../api/notifications';

export const setNotificationsList = (notifications) => ({ type: REQUEST_NOTIFICATIONS, notifications });

export const requestNotificationsList = () => (dispatch) => {
  return getNotifications()
    .then((notifications) => (dispatch(setNotificationsList(notifications))));
};

export const removeNotification = (id) => (dispatch) => {
  return deleteNotification(id)
    .then(() => (dispatch(requestNotificationsList())));
};
