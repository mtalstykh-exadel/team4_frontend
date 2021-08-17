import axiosInstance from './axios';

const getTestsForVerification = () => {
  return axiosInstance.get('/tests/unverified_assigned').then((response) => response.data);
};

const getTestForVerification = (testId) => {
  return axiosInstance.get(`/tests/verify/${testId}`)
    .then((response) => response.data);
};

const submitTestGrades = (testId) => {
  return axiosInstance.put(`/grades/submit/${testId}`);
};

const getTestGrades = (testId) => {
  return axiosInstance.get(`/grades/${testId}`)
    .then((response) => response.data);
};

const saveTestGrades = (question) => {
  return axiosInstance.post('/grades/', question)
    .then((response) => response.data);
};

export { getTestsForVerification, getTestForVerification, submitTestGrades, saveTestGrades, getTestGrades };
