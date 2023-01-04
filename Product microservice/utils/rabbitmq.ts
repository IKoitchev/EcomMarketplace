import client, { Channel, Connection } from 'amqplib';
import { ProductDocument } from '../models/product.model';
import log from './logger';
require('dotenv').config();

const connectionString: string = process.env.AMQP_CONNECTION_STRING || '';

export default async function RabbitMQConnection() {
  const connection: Connection = await client.connect(connectionString);
  return connection;
}

export async function testRabbitMQ() {
  const channel: Channel = await (await RabbitMQConnection()).createChannel();
  await channel.assertQueue('app-start-queue');
  channel.sendToQueue('app-start-queue', Buffer.from(`message test`));
}

export async function onProductChange(product: ProductDocument, event: string) {
  const connection: Connection = await RabbitMQConnection();
  const channel: Channel = await connection.createChannel();

  const exchange: string = `${event}-products`;

  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });
  log.info(product._id);
  channel.publish(exchange, '', Buffer.from(JSON.stringify(product)));
  log.info('product: ' + event);
}
export async function GetResponseQueue() {
  const connection: Connection = await RabbitMQConnection();
  const channel: Channel = await connection.createChannel();
}
