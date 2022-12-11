import client, { Channel, Connection } from 'amqplib';
import { ProductDocument } from '../models/product.model';
import log from './logger';

const connectionString: string =
  'amqps://cmipbrwl:GZQsHdOTlslvA6xxV_xS2Ws8oXlhwiCW@rat.rmq2.cloudamqp.com/cmipbrwl';

export default async function RabbitMQChannel() {
  const connection: Connection = await client.connect(connectionString);
  const channel: Channel = await connection.createChannel();

  return channel;
}

export async function testRabbitMQ() {
  const channel: Channel = await RabbitMQChannel();
  await channel.assertQueue('app-start-queue');
  channel.sendToQueue('app-start-queue', Buffer.from(`message test`));
}

export async function onProductChange(
  product: ProductDocument,
  event: 'updated' | 'deleted'
) {
  const channel: Channel = await RabbitMQChannel();
  const queue =
    event == 'updated' ? 'update-product-queue' : 'delete-product-queue';

  const exchange = event == 'updated' ? 'product-updates' : 'product-deletions';
  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });
  log.info(product.toString());
  channel.publish(exchange, '', Buffer.from(JSON.stringify(product)));
  log.info('product: ' + event);
}
