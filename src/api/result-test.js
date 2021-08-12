import axiosInstance from './axios';

const getResultTest = (idTest) => {
  return axiosInstance.get('/tests/grades/' + idTest).then((response) => response.data);
};

export {getResultTest};

