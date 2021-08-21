import axiosInstance from './axios';

const getAudioFile = (url) => {
  debugger;
  return axiosInstance.get('/files/' + url, { responseType: 'blob' });
};

export { getAudioFile };
