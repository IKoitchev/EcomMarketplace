import axios from 'axios';
import { IProduct } from '../interfaces/IProduct';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-type': 'application/json',
  },
});

const getAll = () => {
  return api.get<Array<IProduct>>('/products');
};

const ProductService = { getAll };

export default ProductService;
