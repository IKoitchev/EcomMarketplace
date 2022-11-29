import { Express, Request, Response } from 'express';
import {
  addToCartHandler,
  getCartProductsHandler,
} from '../controllers/cartController';
import { addtoCartSchema } from '../schema/orderSchema';
import validate from '../middleware/validateOrder';

export default function ShoppingCartRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/cart-products', getCartProductsHandler);
  app.post('/update-cart', validate(addtoCartSchema), addToCartHandler);
  // app.post('/remove-from-cart');
  app.post('checkout');
}
