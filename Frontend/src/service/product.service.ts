import { IProduct } from '../interfaces/IProduct';
import axiosClient from '../utils/axiosClient';

const getAll = () => {
  return axiosClient.get<Array<IProduct>>('/products');
};

const ProductService = { getAll };

const createProduct = (product: IProduct) => {
  return axiosClient.post('/products', product);
};

export default ProductService;
