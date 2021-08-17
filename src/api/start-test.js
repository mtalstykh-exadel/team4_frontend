import axiosInstance from './axios';

export const startTestByLevel = (level) => {
  return axiosInstance.post('/tests/start?level=' + level).then((response) => response.data);
};

export const startTestById = (testId) => {
  return axiosInstance.post(`/tests/start/${testId}`).then((response) => response.data);
};
