import app from './app';
import productRoutes from './routes/product.routes';
import connect from './utils/db.connect';
import log from './utils/logger';
const port = process.env.PORT || 3008;

app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  await connect();
  productRoutes(app);
});
