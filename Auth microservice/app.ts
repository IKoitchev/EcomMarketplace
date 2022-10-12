import express from 'express';
import config from 'config';
import connect from './utils/db.connect';
import logger from './utils/logger';
import authRoutes from './routes/auth';
import cors from 'cors';
import { checkJwt } from './middleware/checkjwt';

const appOrigin = config.get<string>('appOrigin');

const app = express();
const port = config.get<number>('port');

app.use(cors({ origin: appOrigin }));
app.use(express.json());
app.use(checkJwt);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  authRoutes(app);
});
