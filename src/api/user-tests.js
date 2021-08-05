import axiosInstance from './axios';

const getUserTests = () => {
  return axiosInstance.get('/tests/').then((response) => response.data);
};

export default getUserTests;
