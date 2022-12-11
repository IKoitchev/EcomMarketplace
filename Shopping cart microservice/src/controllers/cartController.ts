import { Request, Response } from 'express';
import {
  addToCart,
  getCartProducts,
  removeFromCart,
} from '../service/cartService';
import log from '../utils/logger';

export async function addToCartHandler(req: Request, res: Response) {
  try {
    const result = await addToCart(req.body);
    //verify if product exists
    res.status(200).send('Cart updated');
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}
export async function getCartProductsHandler(req: Request, res: Response) {
  const products = await getCartProducts(req.body);
  log.info('controller');
  res.status(200).send('products');
}

export async function removeFromCartHandler(req: Request, res: Response) {
  try {
    const result = await removeFromCart(req.body);
    res.status(204).send(result);
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}
