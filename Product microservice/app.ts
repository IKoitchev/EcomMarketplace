import express from 'express';
import config from 'config';
import connect from './utils/db.connect';
import logger from './utils/logger';
import productRoutes from './routes/product.routes';
import { testRabbitMQ } from './utils/rabbitmq';

const app = express();

const port = config.get<number>('port');

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  productRoutes(app);
});
