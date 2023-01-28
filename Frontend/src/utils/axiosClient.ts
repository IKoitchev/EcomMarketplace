import axios, { AxiosInstance } from 'axios';

// const gatewayURL = 'http://localhost:8080';
const gatewayURL = 'http://35.227.219.118/';

const axiosClient: AxiosInstance = axios.create({
  baseURL: gatewayURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
