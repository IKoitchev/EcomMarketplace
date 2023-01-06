import app from './src/app';
import ShoppingCartRoutes from './src/routes/shoppingCartRoutes';
import connect from './src/utils/db.connect';
import log from './src/utils/logger';
import { onProductDeleted, onProductUpdated } from './src/utils/rabbitmq';
require('dotenv').config();

const port = process.env.PORT || 3009;

app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  await connect();
  onProductUpdated();
  onProductDeleted();
  ShoppingCartRoutes(app);
});
