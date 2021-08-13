import axiosInstance from './axios';

const errorReport = (report) => {
  return axiosInstance.post('/error_reports/', report);
};

const deleteReport = (questionID, testID) => {
  return axiosInstance.delete('/error_reports/?questionId=' + questionID + '&testId=' + testID);
};

export { errorReport, deleteReport };
