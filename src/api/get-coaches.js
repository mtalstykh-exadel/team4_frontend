import axiosInstance from './axios';

const getCoaches = () => {
  return axiosInstance.get('/coaches').then((response) => response.data);
};

export default getCoaches;
