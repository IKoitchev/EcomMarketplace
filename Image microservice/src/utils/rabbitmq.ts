import client, {
  Channel,
  ConfirmChannel,
  Connection,
  ConsumeMessage,
} from 'amqplib';
import { ProductDocument } from '../models/product.model';
import { deleteImage } from '../service/imageService';
import log from './logger';

const connectionString: string =
  'amqps://cmipbrwl:GZQsHdOTlslvA6xxV_xS2Ws8oXlhwiCW@rat.rmq2.cloudamqp.com/cmipbrwl';

export async function RabbitMQConnection() {
  const connection: Connection = await client.connect(connectionString);
  return connection;
}

export async function onProductDeleted() {
  const connection: Connection = await RabbitMQConnection();
  const channel: ConfirmChannel = await connection.createConfirmChannel();

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
    async (msg) => {
      if (msg?.content) {
        const product: ProductDocument = JSON.parse(msg.content.toString());
        log.info('[x] deleted product queue ');
        log.info(product);
        // delete image
        const res = await deleteImage(product.image);

        sendToResponseQueue(channel, msg, res);
      }
    },
    { noAck: false }
  );
}
async function sendToResponseQueue(
  channel: Channel,
  message: ConsumeMessage,
  result: string
) {
  log.info(message.content.toString());
  log.info(message.properties);

  const replyQ = message?.properties.replyTo;
  await channel.assertQueue(replyQ);

  channel.sendToQueue(replyQ, Buffer.from(result), {
    correlationId: message.properties.correlationId,
    headers: { sender: 'Image service' },
  });
}
