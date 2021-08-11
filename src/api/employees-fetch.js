import axiosInstance from './axios';

const getEmployees = () => {
  return axiosInstance.get('/employees').then((response) => response.data);
};

export default getEmployees;
