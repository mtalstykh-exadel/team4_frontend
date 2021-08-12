import axiosInstance from './axios';

const startTest = (level) => {
  return axiosInstance.post('/tests/start?level=' + level).then((response) => response.data);
};

export { startTest };
