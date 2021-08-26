import axiosInstance from './axios';

const changeAttempts = (id) => {
  return axiosInstance.post(`/tests/playAudio/${id}`);
};

export { changeAttempts };
