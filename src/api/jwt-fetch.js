import axiosInstance from './axios';
import { saveJWTtoLocalstorage } from '../utils/jwt-parser';

const handleJWT = async (data) => {
  return axiosInstance.post('/login', data )
    .then((response) => saveJWTtoLocalstorage(response.data));
};

export default handleJWT;
