import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import shoppingCartRoutes from '../src/routes/shoppingCartRoutes';
import connect from '../src/utils/db.connect';

beforeEach(() => {
  shoppingCartRoutes(app);
});

describe('Shopping cart routes', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
});
