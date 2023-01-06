import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';

import productRoutes from '../routes/product.routes';

beforeEach(async () => {
  productRoutes(app);
  await mongoose.connect(process.env['MONGO_URI']!);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Product routes', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});

// describe('Product routes', () => {
//   test('Get Products', async () => {
//     const res = await request(app).get('/products');
//     expect(res.status).toEqual(200);
//     expect(res.body).toBeInstanceOf(Array<ProductDocument>);
//   });
// });
