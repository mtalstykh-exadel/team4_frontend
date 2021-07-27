import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://untitled-testing-system.herokuapp.com'
});

export default axiosInstance;
