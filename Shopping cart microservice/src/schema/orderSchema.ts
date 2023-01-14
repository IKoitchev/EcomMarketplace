import { number, object, string, array } from 'zod';
import { createProductSchema, productSchemaObject } from './product.schema';

export const addtoCartSchema = object({
  body: object({
    userEmail: string({ required_error: 'user id is required' }),
    // product: object(productSchemaObject),
  }),
});
