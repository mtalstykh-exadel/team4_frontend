import axiosInstance from './axios';

const getNotifications = () => {
  return axiosInstance.get('/notifications/')
    .then((response) => response.data);
};

const deleteNotification = (id) => {
  return axiosInstance.delete(`/notifications/${id}`)
    .then((response) => response.data);
};

export {getNotifications, deleteNotification };
