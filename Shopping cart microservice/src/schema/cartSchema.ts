import { number, object, string, array } from 'zod';
import { createProductSchema } from './product.schema';

export const addtoCartSchema = object({
  body: object({
    userId: string({ required_error: 'user id is required' }),
    productList: array(createProductSchema, {
      required_error: 'product list is required',
    }),
  }),
});
