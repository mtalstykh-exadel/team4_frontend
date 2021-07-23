import { saveJWT } from "../utils/jwt-parser";
import axiosInstance from "./axios";

const handlejwt = async (data) => {
  return axiosInstance.post('/login', data )
    .then((response) => saveJWT(response.data));
};

export default handlejwt;
