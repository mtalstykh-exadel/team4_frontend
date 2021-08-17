import axiosInstance from './axios';

const getUnverifiedTests = () => {
  return axiosInstance.get('/tests/unverified/').then((response) => response.data);
};

const postAssignCoach = (testId, coachId) => {
  return axiosInstance.post('/tests/assign_coach/' + testId + '?coachId=' + coachId).then((response) => response.data);
};

const postDeassignCoach = (testId) => {
  return axiosInstance.post('/tests/deassign_coach/' + testId).then((response) => response.data);
};

export { getUnverifiedTests, postAssignCoach, postDeassignCoach };
