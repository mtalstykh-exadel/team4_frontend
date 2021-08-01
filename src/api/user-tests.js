import axiosInstance from "./axios";

const getUserTests = async (data) => {
  return axiosInstance.post('/tests', data )
    .then((response) => response.data);
};

export default getUserTests;
