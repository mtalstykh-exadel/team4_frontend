import axiosInstance from "./axios";
import { saveJWT } from "../utils/jwt-parser";

const handleJWT = async (data) => {
  return axiosInstance.post('/login', data )
    .then((response) => saveJWT(response.data));
};

export default handleJWT;
