import { Request, Response } from 'express';

import { ProductService } from '../service/product.service';
import logger from '../utils/logger';

export async function createProductHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    const product = await ps.createProduct(req.body);
    return res.status(201).send(product);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send(e.message);
  }
}
export async function getAllProductsHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    const products = await ps.getAllProducts();
    res.status(200).send(products);
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function updateProductHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    const product = await ps.updateProduct(req.body);
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
    const ps = new ProductService();
    const result = await ps.deleteProduct(req.body._id);
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
    const ps = new ProductService();
    console.log(req.body);
    const products = await ps.getProductsByNames(req.body);
    return res.status(200).send(products);
  } catch (e: any) {
    throw new Error(e);
  }
}
