import axiosInstance from './axios';

const getTest = (idTest) => {
  return axiosInstance.get('/tests/' + idTest).then((response) => response.data);
};
export { getTest };
