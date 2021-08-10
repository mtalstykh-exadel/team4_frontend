import axiosInstance from './axios';

const setLanguage = (language) => {
  return axiosInstance.put(`/language?language=${language}`);
};

export default setLanguage;
