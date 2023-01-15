import { Express, Request, Response } from 'express';
import {
  GetImageHandler,
  UploadImageHandler,
} from '../controllers/ImageController';
import { checkJwt, checkScopes } from '../middleware/checkjwt';
import { validateImage } from '../middleware/ValidateImage';

export default function ImageRoutes(app: Express) {
  app.post(
    '/images',
    [checkJwt, checkScopes(['create:product']), validateImage],
    UploadImageHandler
  ); //
  app.get('/images/:name', GetImageHandler);
  app.get('/', (req: Request, res: Response) => {
    // GKE health check
    res.sendStatus(200);
  });
}
