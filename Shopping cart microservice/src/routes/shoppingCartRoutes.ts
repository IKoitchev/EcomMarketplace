import { Express, Request, Response } from 'express';
import {
  addToCartHandler,
  getCartProductsHandler,
  removeFromCartHandler,
} from '../controllers/cartController';
import { addtoCartSchema } from '../schema/orderSchema';
import validate from '../middleware/validateOrder';

export default function ShoppingCartRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/cart/products', getCartProductsHandler);
  app.post('/cart/add', validate(addtoCartSchema), addToCartHandler);
  app.put('/cart/remove', removeFromCartHandler);
  // app.post('/remove-from-cart');
  app.post('cart/checkout');
}
