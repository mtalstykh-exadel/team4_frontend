import axiosInstance from './axios';

const getUnverifiedTests = () => {
  return axiosInstance.get('/tests/unverified_assigned').then((response) => response.data);
};

const getUnverifiedTest = (testId) => {
  return axiosInstance.get(`/tests/verify/${testId}`)
    .then((response) => response.data);
};

const submitTestGrades = (testId) => {
  return axiosInstance.put(`/tests/${testId}`);
};

const getTestGrades = (testId) => {
  return axiosInstance.get(`/grades/${testId}`)
    .then((response) => response.data);
};

const saveTestGrades = (question) => {
  return axiosInstance.post('/grades/', question)
    .then((response) => response.data);
};

export { getUnverifiedTests, getUnverifiedTest, submitTestGrades, saveTestGrades, getTestGrades };
