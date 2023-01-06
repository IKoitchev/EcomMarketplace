import express, { Request, Response } from 'express';
import config from 'config';
import connect from './utils/db.connect';
import log from './utils/logger';
import productRoutes from './routes/product.routes';
import RabbitMQChannel from './utils/rabbitmq';
import cors from 'cors';
import { Channel, Connection, ConsumeMessage } from 'amqplib';
import { ProductService } from './service/product.service';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.get('/healthcheck', (req: Request, res: Response) => {
//   console.log('asodfghasldghsadgdgsdlgsdgsdbjgaaslasbg');
//   res.sendStatus(200);
// });
let channel: Channel;
const requestQ = 'shopping-cart-products-req';
const responseQ = 'shopping-cart-products-res'; // to be moved to config?

// async function ConnectRabbitMQ() {
//   channel = await RabbitMQChannel();
//   await channel.assertQueue(requestQ);

//   channel.consume(requestQ, async (msg) => {
//     // log.info('consume');
//     if (msg) {
//       const content = msg?.content.toString();
//       // log.info('content:');
//       // log.info(content);
//       const ps = new ProductService();
//       const products = await ps.getProductsByNames(content.split('---')); //change to ---
//       // log.info(products);
//       // log.info(msg?.properties);
//       channel.sendToQueue(
//         msg?.properties.replyTo,
//         Buffer.from(products?.toString() || ' '),
//         {
//           correlationId: msg?.properties.correlationId,
//         }
//       );
//     } else {
//       // log.error('no message');
//     }
//   });
// }

// ConnectRabbitMQ();

export default app;
