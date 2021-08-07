import axiosInstance from './axios';

const getEmployees = () => {
  return axiosInstance.get('/users/coaches').then((response) => response.data);
};

export default getEmployees;
