import mongoose from 'mongoose';
import request from 'supertest';
import app from '../src/app';
import ImageRoutes from '../src/routes/imageRoutes';
import fs from 'fs';

beforeEach(() => {
  ImageRoutes(app);
});

describe('Image routes', () => {
  test('Health check', async () => {
    const res = await request(app).get('/');
    expect(res.status).toEqual(200);
  });
  test('Get image by name', async () => {
    const testImageName = 'testImage.png';
    const expectedImage = fs.readFileSync('./public/images/' + testImageName);
    const res = await request(app).get('/images/' + testImageName);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(expectedImage);
  });
});
