import { Guid } from 'js-guid';
import { DocumentDefinition } from 'mongoose';
import CartModel, { CartDocument } from '../models/cartModel';
import { RabbitMQChannel } from '../utils/rabbitmq';

export async function addToCart(input: DocumentDefinition<CartDocument>) {
  // try {
  //   const cart = await CartModel.(input);
  //   return cart.toJSON();
  // } catch (e: any) {
  //   throw new Error(e);
  // }
}

export async function getCartProducts(input: string[]): Promise<string> {
  const queue = 'shopping-cart-products';
  const channel = await RabbitMQChannel();
  await channel.assertQueue(queue);

  let correlationId = Guid.newGuid().toString();
  let content: string;
  // console.log(correlationId);
  return new Promise((resolve) => {
    channel.consume(
      queue,
      (msg) => {
        // console.log(msg?.content.toString());
        if (msg?.properties.correlationId === correlationId) {
          console.log('setting content');

          content = msg.content.toString();
        } else {
          console.log('nomsg'); //mb better error handling
        }
        resolve(content);
      },
      { noAck: true }
    );
    channel.sendToQueue(queue, Buffer.from(input.join('-')), {
      correlationId: correlationId,
      replyTo: queue,
    });
  });
}
