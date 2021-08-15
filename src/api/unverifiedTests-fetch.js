import axiosInstance from './axios';

import { gradeEssay, gradeSpeaking } from '../constants/localStorageConstants';

const getUnverifiedTests = () => {
  return axiosInstance.get('/tests/unverified_assigned').then((response) => response.data);
};

const getReports = (testId) => {
  return axiosInstance.get(`/tests/verify/${testId}`)
    .then((response) => response.data);
};

const setTestGrades = (id) => {
  return setModuleGrade(localStorage.getItem(`${gradeEssay}${id}`))
    .then(() => setModuleGrade(localStorage.getItem(`${gradeSpeaking}${id}`)));
};

const setModuleGrade = (question) => {
  return axiosInstance.post('/grades/', question)
    .then((response) => response.data);
};

export { getUnverifiedTests, getReports, setModuleGrade, setTestGrades };
