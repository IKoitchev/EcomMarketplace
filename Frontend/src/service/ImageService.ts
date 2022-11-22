import axiosClient from '../utils/axiosClient';
import { AxiosRequestConfig } from 'axios';

const gatewayURL = 'http://localhost:8080'; //maybe move to a config file

export const UploadImage = (image: File, options: AxiosRequestConfig) => {
  const fd = new FormData();
  fd.append('file', image, image.name);
  return axiosClient.post('/images', fd, options);
};

export const ImageURL = (imageName: string): string => {
  return `${gatewayURL}/images/${imageName}`;
};
