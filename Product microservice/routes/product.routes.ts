import { Express, Request, Response } from 'express';
require('dotenv').config;

import {
  createProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductsByNamesHandler,
  updateProductHandler,
} from '../controllers/product.controller';
import { checkJwt } from '../middleware/checkjwt';
import validate from '../middleware/validate.resource';
import { createProductSchema } from '../schema/product.schema';

function productRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/products', getAllProductsHandler);

  app.post(
    '/products',
    [checkJwt, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    '/products',
    [checkJwt, validate(createProductSchema)],
    updateProductHandler
  );

  app.delete('/products', checkJwt, deleteProductHandler);

  app.get('/byNames', getProductsByNamesHandler); //endpoint is for testing
}

export default productRoutes;
