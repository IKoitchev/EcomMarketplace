import axios, { AxiosInstance } from 'axios';

const authServiceURL = 'http://localhost:8080';

const axiosClient: AxiosInstance = axios.create({
  baseURL: authServiceURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
