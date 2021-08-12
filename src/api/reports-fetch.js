import axiosInstance from './axios';

const getReports = (testId) => {
  return axiosInstance.get(`/error_reports/${testId}`)
    .then((response) => response.data);
};

export default getReports;
