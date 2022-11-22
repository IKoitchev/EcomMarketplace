import { Express, Request, Response } from 'express';
import {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsByNamesHandler,
} from '../controllers/product.controller';
import { checkJwt } from '../middleware/checkjwt';
import validate from '../middleware/validate.product';
import { createProductSchema } from '../schema/product.schema';

function productRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
  app.get('/products', getAllProductsHandler);

  app.post(
    '/products',
    [checkJwt, validate(createProductSchema)], //checkjwt
    createProductHandler
  );

  app.put(
    '/products',
    [checkJwt, validate(createProductSchema)],
    updateProductHandler
  );

  app.delete('/products', checkJwt, deleteProductHandler);

  app.get('/products/byNames', getProductsByNamesHandler); //endpoint is for testing
}

export default productRoutes;
