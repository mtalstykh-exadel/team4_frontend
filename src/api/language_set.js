import axiosInstance from './axios';

const setLanguage = (language) => {
  console.log(language);
  return axiosInstance.put(`/language?language=${language}`);
};

export default setLanguage;
