import { Request, Response } from 'express';
import { addToCart, getCartProducts } from '../service/cartService';
import log from '../utils/logger';

export async function addToCartHandler(req: Request, res: Response) {
  const cart = await addToCart(req.body);
}
export async function getCartProductsHandler(req: Request, res: Response) {
  const products = await getCartProducts(req.body);
  log.info('controller');
  res.status(200).send('products');
}
