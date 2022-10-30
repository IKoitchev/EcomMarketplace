import { Express, Request, Response } from 'express';
import { getCartProductsHandler } from '../controllers/cartController';

export default function ShoppingCartRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/cart-products/:id', getCartProductsHandler);
  app.post('/add-to-cart');
  app.post('/remove-from-cart');
  app.post('checkout');
}
