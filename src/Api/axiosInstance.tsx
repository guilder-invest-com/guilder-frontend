import axios from 'axios';

const BACKEND_API_URL = "https://backend.guilder-invest.com:8443";

const axiosInstance = axios.create({
  baseURL: BACKEND_API_URL,
  withCredentials: true, 
});

export default axiosInstance;
