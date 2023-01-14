import { Guid } from 'js-guid';
import { DocumentDefinition, Mongoose } from 'mongoose';
import OrderModel, { UpdateCartDocument, OrderDocument } from '../models/order';
import ProductModel, { ProductDocument } from '../models/product.model';
import log from '../utils/logger';
import RabbitMQConnection from '../utils/rabbitmq';
import { addToDeletedList, isDeleted } from '../utils/redis.connect';
import { hash, objectIsModified } from './hashing/hashingService';

let correlationIDs: string[] = [];
let id: string;
function getGuid(): string {
  const id = Guid.newGuid().toString();
  log.info('new guid');
  log.info(id);
  return id;
}
export async function addToCart(input: DocumentDefinition<UpdateCartDocument>) {
  console.log(input.product.checksum);
  try {
    log.info('service:');
    log.info({ ...input.product });
    //check if empty/default to avoid unnecessary computation
    if (
      (await isDeleted(input.product.checksum)) ||
      objectIsModified({ ...input.product }, input.product.checksum)
    ) {
      throw new Error(
        `Product with name ${input.product.name} does not exist or was modified unexpectedly`
      );
    }
    const res = await OrderModel.findOneAndUpdate(
      { userEmail: input.userEmail, isFinished: false },
      { $push: { productList: input.product } },
      { upsert: true, new: true }
    );
    // log.info(res);
    return res;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
//will not be used, kept as a reference
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

export async function removeFromCart(
  input: ProductDocument,
  userEmail?: string
) {
  log.info(input);
  try {
    // if email is null update all carts
    if (!userEmail) {
      const result = await OrderModel.updateMany(
        {},
        {
          $pull: {
            productList: { name: input.name }, // better to do it with id but there are issues when using objectid ...
          },
        }
      );
      await addToDeletedList(input.checksum, 'deleted');
      log.info(result);
      return result;
    } else {
      const result = await OrderModel.findOneAndUpdate(
        { userEmail: userEmail },
        {
          $pull: {
            productList: { name: input.name },
          },
        },
        { new: true }
      );
      log.info(result);
      return result;
    }
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function checkout(userEmail: string) {
  try {
    const result = await OrderModel.findOneAndUpdate(
      { userEmail: userEmail, isFinished: false },
      { isFinished: true },
      { upsert: false }
    );
    return result;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
