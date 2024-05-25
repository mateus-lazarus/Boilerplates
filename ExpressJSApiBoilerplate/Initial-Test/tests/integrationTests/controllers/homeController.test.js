import request from 'supertest';
import express from 'express';
import { expect, describe, test } from '@jest/globals'
import { homeRoutes } from '../../../routes/homeRoutes.js';

const app = express();
app.use(express.json());
app.use('/', homeRoutes);

describe('homeController', () => {
  test('GET / should return "Hello, world!"', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
  });

  test('GET /about should return "About Page"', async () => {
    const response = await request(app).get('/about');

    expect(response.statusCode).toBe(200);
  });
  
});
