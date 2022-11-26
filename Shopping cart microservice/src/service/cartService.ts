import { Guid } from 'js-guid';
import { DocumentDefinition } from 'mongoose';
import CartModel, { CartDocument } from '../models/cartModel';
import log from '../utils/logger';
import { RabbitMQChannel } from '../utils/rabbitmq';

let correlationIDs: string[] = [];
let id: string;
function getGuid(): string {
  const id = Guid.newGuid().toString();
  log.info('new guid');
  log.info(id);
  return id;
}
export async function addToCart(input: DocumentDefinition<CartDocument>) {
  // try {
  //   const cart = await CartModel.(input);
  //   return cart.toJSON();
  // } catch (e: any) {
  //   throw new Error(e);
  // }
}

export async function getCartProducts(input: string[]) {
  const requestQ = 'shopping-cart-products-req';
  const responseQ = 'shopping-cart-products-res';

  const channel = await RabbitMQChannel();
  await channel.assertQueue(requestQ);
  await channel.assertQueue(responseQ);

  id = getGuid();
  correlationIDs.push(id);
  let content: string;

  channel.consume(
    responseQ,
    async function (msg) {
      log.info('check');
      if (correlationIDs.includes(msg?.properties.correlationId)) {
        correlationIDs.splice(
          correlationIDs.indexOf(msg?.properties.correlationId),
          1
        );
        log.info(msg?.content.toString());
        content = msg!.content.toString();
      }
    },
    {
      noAck: false,
    }
  );

  log.info('send');
  channel.sendToQueue(requestQ, Buffer.from(input.join('---')), {
    replyTo: responseQ,
    correlationId: id,
  });
}
