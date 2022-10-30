import { Request, Response } from 'express';

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsByNames,
  updateProduct,
} from '../service/product.service';
import logger from '../utils/logger';

export async function createProductHandler(req: Request, res: Response) {
  try {
    const product = await createProduct(req.body);
    return res.status(201).send(product);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
export async function getAllProductsHandler(req: Request, res: Response) {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function updateProductHandler(req: Request, res: Response) {
  try {
    const product = await updateProduct(req.body);
    if (product === null) {
      return res.status(400).send('Product does not exist');
    }
    return res.status(204).send(product);
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const result = await deleteProduct(req.body._id);
    if (result.deletedCount === 0) {
      return res.status(400).send('Error deleting product');
    }
    return res.status(200).send('Product deleted successfully');
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function getProductsByNamesHandler(req: Request, res: Response) {
  try {
    console.log(req.body);
    const products = await getProductsByNames(req.body);
    return res.status(200).send(products);
  } catch (e: any) {
    throw new Error(e);
  }
}
