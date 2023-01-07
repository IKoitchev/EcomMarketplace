import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import shoppingCartRoutes from '../src/routes/shoppingCartRoutes';

beforeEach(async () => {
  shoppingCartRoutes(app);
  await mongoose.connect(process.env['MONGO_URI']!);
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Shopping cart routes', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
  test('Get all orders', async () => {
    const res = await request(app).get('/all');
    expect(res.status).toEqual(200);
  });
});
