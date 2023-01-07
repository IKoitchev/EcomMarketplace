import { Express, Request, Response } from 'express';
import {
  addToCartHandler,
  // getCartProductsHandler,
  removeFromCartHandler,
} from '../controllers/cartController';
import { addtoCartSchema } from '../schema/orderSchema';
import validate from '../middleware/validateOrder';
import OrderModel from '../models/order';

export default function ShoppingCartRoutes(app: Express) {
  // app.get('/cart/products', getCartProductsHandler);
  app.post('/cart/add', validate(addtoCartSchema), addToCartHandler);
  app.put('/cart/remove', removeFromCartHandler);
  // app.post('/remove-from-cart');
  app.post('cart/checkout');
  app.get('/', (req: Request, res: Response) => {
    // GKE health check
    res.sendStatus(200);
  });
  app.get('/all', async (req: Request, res: Response) => {
    const resp = await OrderModel.find();
    res.send(resp);
  });
}
