import client, { Channel, Connection, ConfirmChannel } from 'amqplib';
import { ProductDocument } from '../models/product.model';
import { removeFromCart } from '../service/cartService';
import log from './logger';
require('dotenv').config();

const connectionString: string = process.env.AMQP_CONNECTION_STRING || '';

export default async function RabbitMQConnection() {
  const connection: Connection = await client.connect(connectionString);
  return connection;
}

export async function onProductUpdated() {
  const connection: Connection = await RabbitMQConnection();
  const channel: ConfirmChannel = await connection.createConfirmChannel();

  const exchange = 'product-updates';
  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });
  const q = await channel.assertQueue('', {
    exclusive: true,
  });
  channel.bindQueue(q.queue, exchange, '');

  channel.consume(
    q.queue,
    (msg) => {
      if (msg?.content) {
        const product: ProductDocument = JSON.parse(msg.content.toString());
        log.info(' [x] updated product queue');
        log.info(product);
      }
    },
    { noAck: true }
  );
}
export async function onProductDeleted() {
  const connection: Connection = await RabbitMQConnection();
  const channel: Channel = await connection.createChannel();

  const exchange = 'deleted-products';
  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });
  const q = await channel.assertQueue('', {
    exclusive: true,
  });
  channel.bindQueue(q.queue, exchange, '');

  channel.consume(
    q.queue,
    (msg) => {
      if (msg?.content) {
        const product: ProductDocument = JSON.parse(msg.content.toString());
        log.info(' [x] deleted product queue');
        removeFromCart(product)
          .then(() => {
            log.info(msg.content.toString());
            channel.ack(msg);
          })
          .catch((err) => {
            log.error(err.message);
          });
      }
    },
    { noAck: false }
  );
}
