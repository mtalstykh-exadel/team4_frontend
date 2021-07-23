import { saveJWT } from "../utils/jwt-parser";
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://untitled-testing-system.herokuapp.com'
});

const handlejwt = async (data) => {
  return axiosInstance.post('/login', data )
    .then((response) => saveJWT(response.data));
};

export default handlejwt;
