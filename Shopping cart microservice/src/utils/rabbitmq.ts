import client, { Channel, Connection } from 'amqplib';
import { ProductDocument } from '../models/product.model';
import { removeFromCart } from '../service/cartService';
import log from './logger';

const connectionString: string =
  'amqps://cmipbrwl:GZQsHdOTlslvA6xxV_xS2Ws8oXlhwiCW@rat.rmq2.cloudamqp.com/cmipbrwl';

export async function RabbitMQChannel() {
  const connection: Connection = await client.connect(connectionString);
  const channel: Channel = await connection.createChannel();

  return channel;
}

export async function testRabbitMQ() {
  const channel: Channel = await RabbitMQChannel();
  await channel.assertQueue('app-start-queue');
  channel.sendToQueue('app-start-queue', Buffer.from(`message test`));
}

export async function onProductUpdated() {
  const channel: Channel = await RabbitMQChannel();
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
  const channel: Channel = await RabbitMQChannel();
  const exchange = 'product-deletions';
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
        log.info(product);
        removeFromCart(product);
      }
    },
    { noAck: true }
  );
}