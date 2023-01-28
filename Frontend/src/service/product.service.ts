import { IProduct } from '../interfaces/IProduct';
import axiosClient from '../utils/axiosClient';
import { AxiosRequestConfig } from 'axios';

const getAll = () => {
  return axiosClient.get<Array<IProduct>>('/products');
};

const createProduct = (product: IProduct, options: AxiosRequestConfig) => {
  return axiosClient.post('/products', product, options);
};

const ProductService = { getAll, createProduct };

export default ProductService;
