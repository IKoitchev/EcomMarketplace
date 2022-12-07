import { Express, Request, Response } from 'express';
import {
  getAllProductsHandler,
  createProductHandler,
  updateProductHandler,
  deleteProductHandler,
  getProductsByNamesHandler,
} from '../controllers/product.controller';
import { checkJwt, checkScopes } from '../middleware/checkjwt';
import validate from '../middleware/validate.product';
import { createProductSchema } from '../schema/product.schema';

function productRoutes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
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

  //this deletes only if user is admin
  //good to have: check if the user id in the jwt is the same as the one of the author
  //maybe make unique user names and get user id by name from the management API
  //can be done when/if/instead of checkScopes middleware returning error
  app.delete(
    '/products/:productId',
    [checkJwt, checkScopes(['delete:any_product'])],
    deleteProductHandler
  );

  app.get('/products/byNames', getProductsByNamesHandler); //endpoint is for testing
  app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
  });
}

export default productRoutes;
