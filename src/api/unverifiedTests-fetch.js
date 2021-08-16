import axiosInstance from './axios';

const getUnverifiedTests = () => {
  return axiosInstance.get('/tests/unverified/').then((response) => response.data);
};

export default getUnverifiedTests;
