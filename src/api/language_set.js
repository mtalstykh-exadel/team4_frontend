import axiosInstance from './axios';

import { getJWTtoken } from '../utils/jwt-parser';

const setLanguage = (language) => {
  const token = getJWTtoken();
  if (token) {
    return axiosInstance.put(`/language?language=${language}`);
  }
};

export default setLanguage;
