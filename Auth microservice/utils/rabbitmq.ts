import client, { Channel, Connection } from 'amqplib';

const connectionString: string = 'amqp://username:password@localhost:5672';

export async function RabbitMQChannel() {
  const connection: Connection = await client.connect(connectionString);
  const channel: Channel = await connection.createChannel();

  return channel;
}

async function testRabbitMQ() {
  const channel: Channel = await RabbitMQChannel();
  await channel.assertQueue('app-start-queue');
  channel.sendToQueue('1app-start-queue', Buffer.from(`message test`));
}
