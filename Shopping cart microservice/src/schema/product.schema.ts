import { number, object, string, TypeOf } from 'zod';

export const createProductSchema = object({
  body: object({
    name: string({ required_error: 'product name is required' }),
    description: string({ required_error: 'product description is required' }),
    price: number({ required_error: 'product price is required' }),
  }), // refine
});
