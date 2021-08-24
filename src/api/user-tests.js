import axiosInstance from './axios';

const getUserTests = (level, pageNum, pageSize) => {
  return axiosInstance.get(`/tests/?level=${level ? level : ''}&pageNumb=${pageNum}&pageSize=${pageSize}`).then((response) => response.data);
};

export default getUserTests;
