import app from './src/app';
import ImageRoutes from './src/routes/imageRoutes';
import log from './src/utils/logger';
import { onProductUpdated } from './src/utils/rabbitmq';
require('dotenv').config();

const port = process.env.PORT || 3010;
app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  onProductUpdated();
  ImageRoutes(app);
});
