import { number, object, string, TypeOf } from 'zod';

export const productSchemaObject = {
  name: string({ required_error: 'product name is required' }),
  description: string({ required_error: 'product description is required' }),
  price: number({ required_error: 'product price is required' }),
  author: string({ required_error: 'author field is required' }),
  image: string({ required_error: 'image url is required' }),
};

export const createProductSchema = object({
  body: object(productSchemaObject), // refine
});
