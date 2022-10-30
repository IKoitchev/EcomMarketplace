import client, { Channel, Connection } from 'amqplib';
import { connect } from 'http2';

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
export async function connectRabbitMQ() {
  try {
    const connection: Connection = await client.connect(connectionString);
    const channel: Channel = await connection.createChannel();

    await channel.assertQueue('shopping-cart-products');
  } catch (error) {
    console.log(error);
  }
}