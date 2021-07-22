import { saveJWT } from "../utils/jwt-parser";
import axios from 'axios';

const url = 'https://untitled-testing-system.herokuapp.com/login';
const handlejwt = async (data) => {
  return axios.post(url, data)
    .then((response) => saveJWT(response.data));
};

export default handlejwt;
