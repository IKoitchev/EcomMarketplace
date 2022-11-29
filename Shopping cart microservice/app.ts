import express from 'express';
import config from 'config';
import connect from './src/utils/db.connect';
import logger from './src/utils/logger';
import { RabbitMQChannel } from './src/utils/rabbitmq';
require('dotenv').config();
import shoppingCartRoutes from './src/routes/shoppingCartRoutes';

const app = express();

const port = process.env.PORT || 3009;

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  shoppingCartRoutes(app);
});
