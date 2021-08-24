import axiosInstance from './axios';

const getTestsForVerification = (pageNum, pageSize) => {
  return axiosInstance.get(`/tests/unverified_assigned?pageNumb=${pageNum}&pageSize=${pageSize}`).then((response) => response.data);
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

const saveReports = (grammar) => {
  return axiosInstance.put('/coach_reports/', grammar)
    .then((response) => response.data);
};

export { getTestsForVerification, getTestForVerification, submitTestGrades, saveTestGrades, saveReports, getTestGrades };
