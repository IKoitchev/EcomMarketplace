import { Guid } from 'js-guid';
import { DocumentDefinition, Mongoose } from 'mongoose';
import OrderModel, { OrderDocument } from '../models/order';
import { ProductDocument } from '../models/product.model';
import log from '../utils/logger';
import RabbitMQConnection from '../utils/rabbitmq';

let correlationIDs: string[] = [];
let id: string;
function getGuid(): string {
  const id = Guid.newGuid().toString();
  log.info('new guid');
  log.info(id);
  return id;
}
export async function addToCart(input: DocumentDefinition<OrderDocument>) {
  try {
    const res = await OrderModel.updateOne(
      { userId: input.userId, isFinished: false },
      { $set: { productList: input.productList } },
      { upsert: true }
    );
    log.info(res);
    return res;
  } catch (e: any) {
    throw new Error(e);
  }
}

// export async function getCartProducts(input: string[]) {
//   const requestQ = 'shopping-cart-products-req';
//   const responseQ = 'shopping-cart-products-res';

//   const channel = await RabbitMQChannel();
//   await channel.assertQueue(requestQ);
//   await channel.assertQueue(responseQ);

//   id = getGuid();
//   correlationIDs.push(id);
//   let content: string;

//   channel.consume(
//     responseQ,
//     async function (msg) {
//       log.info('check');
//       if (correlationIDs.includes(msg?.properties.correlationId)) {
//         correlationIDs.splice(
//           correlationIDs.indexOf(msg?.properties.correlationId),
//           1
//         );
//         log.info(msg?.content.toString());
//         content = msg!.content.toString();
//       }
//     },
//     {
//       noAck: false,
//     }
//   );

//   log.info('send');
//   channel.sendToQueue(requestQ, Buffer.from(input.join('---')), {
//     replyTo: responseQ,
//     correlationId: id,
//   });
// }

export async function removeFromCart(input: ProductDocument, cartId?: string) {
  try {
    if (!cartId) {
      const result = await OrderModel.updateMany(
        {},
        {
          $pull: {
            productList: { name: input.name }, // better to do it with id but there are issues when using objectid ...
          },
        }
      );

      log.info(result);
      return result;
    }
  } catch (err: any) {
    log.error(err);
  }
}
