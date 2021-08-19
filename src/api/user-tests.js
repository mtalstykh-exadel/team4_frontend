import axiosInstance from './axios';

const getUserTests = (pageNum, pageSize) => {
  return axiosInstance.get(`/tests/?pageNumb=${pageNum}&pageSize=${pageSize}`).then((response) => response.data);
};

export default getUserTests;
