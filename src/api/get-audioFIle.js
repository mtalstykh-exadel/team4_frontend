import axiosInstance from './axios';

const getAudioFile = (url) => {
  return axiosInstance.get('/files/' + url, { responseType: 'blob' })
    .then((response) => {
      return URL.createObjectURL(
        new Blob([response.data], { type: 'audio/ogg' })
      );
  });
};

export { getAudioFile };
