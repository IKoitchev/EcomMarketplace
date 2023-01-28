import { number, object, string, array } from 'zod';
import { createProductSchema, productSchemaObject } from './product.schema';

export const addtoCartSchema = object({
  body: object({
    product: object(productSchemaObject),
  }),
});
