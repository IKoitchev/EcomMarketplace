import { Express } from 'express';
import { validateJwt } from '../controllers/authContorller';

export default function authRoutes(app: Express) {
  app.get('/test', validateJwt);
}
