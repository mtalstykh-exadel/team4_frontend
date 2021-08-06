import axios from 'axios';
import { getJWTtoken } from '../utils/jwt-parser';

const axiosInstance = axios.create({
  baseURL: 'https://untitled-testing-system.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getJWTtoken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosInstance;
