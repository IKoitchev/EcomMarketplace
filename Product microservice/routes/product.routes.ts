import { Express, Request, Response } from 'express';
import {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
} from '../controllers/product.controller';
import { checkJwt, checkScopes } from '../middleware/checkjwt';
import validate from '../middleware/validate.product';
import { createProductSchema } from '../schema/product.schema';

function productRoutes(app: Express) {
  app.get('/products', getAllProductsHandler);

  app.post(
    '/products', //authenticate
    [
      checkJwt,
      checkScopes(['create:product']), // check permission
      validate(createProductSchema),
    ],
    createProductHandler
  );

  app.put(
    '/products',
    [
      checkJwt,
      checkScopes(['update:current_user_product']),
      validate(createProductSchema),
    ],
    updateProductHandler
  );

  //only admin can delete
  app.delete(
    '/products/:productId',
    [checkJwt, checkScopes(['delete:any_product'])],
    deleteProductHandler
  );

  app.get('/', (req: Request, res: Response) => {
    // GKE health check
    res.sendStatus(200);
  });
}
export default productRoutes;
