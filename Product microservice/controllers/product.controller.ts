import { Request, Response } from 'express';
import { objectIsModified } from '../service/hashing/hashingService';

import { ProductService } from '../service/product.service';
import { getEmailFromJwt } from '../utils/jwtHelper';
import log from '../utils/logger';

export async function createProductHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    const product = await ps.createProduct(req.body);
    return res.status(201).send(product);
  } catch (e: any) {
    log.error(e);
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
    if (req.body.author != getEmailFromJwt(req)) {
      return res
        .status(401)
        .send('You are not the owner (author) of this product');
    }
    const ps = new ProductService();
    const product = await ps.updateProduct(req.body);
    if (product === null) {
      return res.status(400).send('Product does not exist');
    }
    return res.status(204).send(product);
  } catch (e: any) {
    res.status(500).send(e?.message);
  }
}
export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    const result = await ps.deleteProduct(req.params.productId);
    if (result === null) {
      return res.status(400).send('Error deleting product');
    }
    return res.status(200).send('Product deleted successfully');
  } catch (e: any) {
    res.status(500).send(e?.message);
  }
}
export async function getProductsByNamesHandler(req: Request, res: Response) {
  try {
    const ps = new ProductService();
    console.log(req.body);
    const products = await ps.getProductsByNames(req.body);
    return res.status(200).send(products);
  } catch (e: any) {
    res.status(500).send(e?.message);
  }
}
