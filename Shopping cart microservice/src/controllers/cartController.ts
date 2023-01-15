import { Request, Response } from 'express';
import {
  addToCart,
  checkout,
  getCartItems,
  removeFromCart,
} from '../service/cartService';
import { getEmailFromJwt } from '../utils/jwtHelper';
import log from '../utils/logger';

export async function addToCartHandler(req: Request, res: Response) {
  try {
    const result = await addToCart(req.body.product, getEmailFromJwt(req));
    //verify if product exists
    res.status(200).send(result);
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}
export async function getCartProductsHandler(req: Request, res: Response) {
  try {
    const products = await getCartItems(getEmailFromJwt(req));
    res.status(200).send(products);
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}

export async function removeFromCartHandler(req: Request, res: Response) {
  try {
    const result = await removeFromCart(req.body.product, getEmailFromJwt(req));
    log.info(result);
    res.status(201).send(result);
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}
export async function checkoutHandler(req: Request, res: Response) {
  try {
    const result = await checkout(getEmailFromJwt(req));
    res.status(200).send(result);
  } catch (err: any) {
    log.error(err?.message);
    res.status(500).send(err?.message);
  }
}
