import { Express, Request, Response } from 'express';
import {
  GetImageHandler,
  UploadImageHandler,
} from '../controllers/ImageController';
import { checkJwt } from '../middleware/checkjwt';
import { validateImage } from '../middleware/ValidateImage';

export default function ImageRoutes(app: Express) {
  app.post('/images', [/*checkJwt,*/ validateImage], UploadImageHandler); //
  app.get('/images/:name', GetImageHandler);
  app.get('/', (req: Request, res: Response) => {
    // GKE health check
    res.sendStatus(200);
  });
}
