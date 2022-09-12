import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import validate from '../middleware/validate.resource';
import { createProductSchema } from '../schema/product.schema';

function productRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/products', getAllProductsHandler);

  app.post('/products', validate(createProductSchema), createProductHandler);

  app.put('/products', validate(createProductSchema), updateProductHandler);

  app.delete('/products', deleteProductHandler);
}

export default productRoutes;
