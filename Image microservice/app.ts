import express from 'express';
import cors from 'cors';
import log from './src/utils/logger';
import morgan from 'morgan';
import ImageRoutes from './src/routes/imageRoutes';
import fileUpload from 'express-fileupload';
import { onProductUpdated } from './src/utils/rabbitmq';

const port = 3010;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.listen(port, async () => {
  log.info(`App is running at http://localhost:${port}`);
  onProductUpdated();
  ImageRoutes(app);
});
