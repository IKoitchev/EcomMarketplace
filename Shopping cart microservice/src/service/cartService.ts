import { DocumentDefinition } from 'mongoose';
import OrderModel, { UpdateCartDocument } from '../models/order';
import { ProductDocument } from '../models/product.model';
import log from '../utils/logger';
import { addToDeletedList, isDeleted } from '../utils/redis.connect';
import { hash, objectIsModified } from './hashing/hashingService';

export async function addToCart(
  product: DocumentDefinition<ProductDocument>,
  userEmail: string
) {
  try {
    //check if empty/default to avoid unnecessary computation
    if (
      (await isDeleted(product.checksum)) ||
      objectIsModified({ ...product }, product.checksum)
    ) {
      throw new Error(
        `Product with name ${product.name} does not exist or was modified unexpectedly`
      );
    }
    const res = await OrderModel.findOneAndUpdate(
      { userEmail: userEmail, isFinished: false },
      { $push: { productList: product } },
      { upsert: true, new: true }
    );
    return res;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function removeFromCart(
  input: ProductDocument,
  userEmail?: string
) {
  try {
    // if email is null update all carts
    if (!userEmail) {
      const result = await OrderModel.updateMany(
        {},
        {
          $pull: {
            productList: { name: input.name }, // better to do it with id but there are issues when using objectid ...
          },
        },
        { new: true }
      );
      await addToDeletedList(input.checksum, 'deleted');
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
      return result?.toJSON();
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
      { upsert: false, new: true }
    );
    return result;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}

export async function getCartItems(userEmail: string) {
  try {
    const result = await OrderModel.find({
      userEmail: userEmail,
      isFinished: false,
    });
    return result;
  } catch (error: any) {
    log.error(error);
    throw new Error(error);
  }
}
export async function updateCart(input: ProductDocument) {
  try {
    const result = await OrderModel.updateMany(
      {
        productList: { $elemMatch: { name: input.name } },
      },
      { $set: { 'productList.$': input } }
    );
    console.log(result);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
