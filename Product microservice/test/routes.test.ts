import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { ProductDocument } from '../models/product.model';
import productRoutes from '../routes/product.routes';
import connect from '../utils/db.connect';

beforeEach(() => {
  productRoutes(app);
});

describe('Product routes', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});

describe('Product routes', () => {
  test('Get Products', async () => {
    await connect();
    const res = await request(app).get('/products');
    expect(res.status).toEqual(200);
    expect(res.body).toBeInstanceOf(Array<ProductDocument>);
    await mongoose.disconnect();
  });
});
