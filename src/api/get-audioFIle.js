import axiosInstance from './axios';

const getAudioFile = (url) => {
  return axiosInstance.get('/files/' + url, { responseType: 'blob' });
};

export { getAudioFile };
