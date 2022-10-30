import { Request, Response } from 'express';
import { addToCart, getCartProducts } from '../service/cartService';

export async function addToCartHandler(req: Request, res: Response) {
  const cart = await addToCart(req.body);
}
export async function getCartProductsHandler(req: Request, res: Response) {
  const products = await getCartProducts(req.body);
  console.log('products', products);
  res.status(200).send(products);
}
