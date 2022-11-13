import express from 'express';
import config from 'config';
import connect from './utils/db.connect';
import logger from './utils/logger';
import productRoutes from './routes/product.routes';
import RabbitMQChannel, { testRabbitMQ } from './utils/rabbitmq';
import cors from 'cors';
import { Channel, Connection, ConsumeMessage } from 'amqplib';
import { ProductService } from './service/product.service';
import swaggerUi from 'swagger-ui-express';

const port = config.get<number>('port');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static('public'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

let channel: Channel;
const queue = 'shopping-cart-products'; // to be moved to config?

async function ConnectRabbitMQ() {
  channel = await RabbitMQChannel();
  await channel.assertQueue(queue);

  channel.consume(queue, async (msg) => {
    console.log('consume');
    if (msg) {
      const content = msg?.content.toString();
      console.log('content:');
      console.log(content);
      const ps = new ProductService();
      const products = await ps.getProductsByNames(content.split('-'));
      console.log(products);
      channel.sendToQueue(
        msg?.properties.replyTo,
        Buffer.from(products?.toString() || ' '),
        {
          correlationId: msg?.properties.correlationId,
        }
      );
    } else {
      console.log('no message');
    }
  });
}

ConnectRabbitMQ();

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  productRoutes(app);
});
