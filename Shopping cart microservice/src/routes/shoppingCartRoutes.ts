import { Express, Request, Response } from 'express';
import {
  addToCartHandler,
  checkoutHandler,
  getCartProductsHandler,
  // getCartProductsHandler,
  removeFromCartHandler,
} from '../controllers/cartController';
import { addtoCartSchema } from '../schema/orderSchema';
import validate from '../middleware/validateOrder';
import OrderModel from '../models/order';
import { checkJwt, checkScopes } from '../middleware/checkJwt';
import { updateCart } from '../service/cartService';

export default function ShoppingCartRoutes(app: Express) {
  app.get(
    '/cart/products',
    checkJwt,
    checkScopes(['read:cart']),
    getCartProductsHandler
  );

  app.post(
    '/cart/add',
    [checkJwt, checkScopes(['update:cart']), validate(addtoCartSchema)],
    addToCartHandler
  );

  app.put(
    '/cart/remove',
    checkJwt,
    checkScopes(['update:cart']),
    removeFromCartHandler
  );

  app.post(
    '/cart/checkout',
    checkJwt,
    checkScopes(['update:checkout_cart']),
    checkoutHandler
  );
  app.get('/', (req: Request, res: Response) => {
    // GKE health check
    res.sendStatus(200);
  });
}
