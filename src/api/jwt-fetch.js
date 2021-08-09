import axiosInstance from './axios';
import { saveDataToLocalStorage } from '../utils/auth-set-data';

const handleJWT = async (data) => {
  return axiosInstance.post('/login', data )
    .then((response) => saveDataToLocalStorage(response.data));
};

export default handleJWT;
