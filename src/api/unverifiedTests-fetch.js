import axiosInstance from './axios';

const getUnverifiedTests = (pageNum, pageSize) => {
  return axiosInstance.get(`/tests/unverified?pageNumb=${pageNum}&pageSize=${pageSize}`).then((response) => response.data);
};

const postAssignCoach = (testId, coachId) => {
  return axiosInstance.post('/tests/assign_coach/' + testId + '?coachId=' + coachId).then((response) => response.data);
};

const postDeassignCoach = (testId) => {
  return axiosInstance.post('/tests/deassign_coach/' + testId).then((response) => response.data);
};

export { getUnverifiedTests, postAssignCoach, postDeassignCoach };
