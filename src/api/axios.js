import axios from 'axios';
import { getJWTtoken } from '../utils/jwt-parser';

const token = getJWTtoken();

const axiosInstance = axios.create({
  baseURL: 'https://untitled-testing-system.herokuapp.com',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

export default axiosInstance;
