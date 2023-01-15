import client, { Channel, Connection } from 'amqplib';
import { ProductDocument } from '../models/product.model';
import log from './logger';
import { Guid } from 'js-guid';
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
  const replyQueue: string = `${exchange}-reply`;

  channel.assertExchange(exchange, 'fanout', {
    durable: false,
  });

  log.info(product._id);
  channel.publish(exchange, '', Buffer.from(JSON.stringify(product)), {
    correlationId: getGuid(),
    replyTo: replyQueue,
  });
  log.info('product: ' + event);

  const q = await channel.assertQueue(replyQueue, {
    exclusive: false,
  });

  //responses to check if the operation failed on the other end
  channel.consume(replyQueue, (msg) => {
    if (msg) {
      logDynamically(
        `'${msg?.content.toString()}' - from ${
          msg?.properties.headers.sender
        } - ID: ${msg?.properties.correlationId}`
      );
      channel.ack(msg);
    }
  });
}

function getGuid(): string {
  const id = Guid.newGuid().toString();
  // log.info('new guid ' + id);
  return id;
}

//Log dynamically according to log type
function logDynamically(message: string) {
  if (message.includes('error')) {
    return log.error(message);
  }
  return log.info(message);
}
