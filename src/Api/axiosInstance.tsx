import axios from 'axios';

const BACKEND_API_URL = "http://dev.guilder-invest.com:3500";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true, 
});

export default axiosInstance;
