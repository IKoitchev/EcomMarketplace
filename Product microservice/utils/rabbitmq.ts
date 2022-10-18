import client, { Channel, Connection } from 'amqplib';

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
