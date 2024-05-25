import request from 'supertest';
import express from 'express';
import { homeRoutes } from '../../../routes/homeRoutes.js';

const app = express();
app.use(express.json());
app.use('/', homeRoutes);

describe('homeController', () => {
  test('GET / should return "Hello, world!"', async () => {
    const expectResult = 'Hello, world!';

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });

  test('GET /about should return "About Page"', async () => {
    const expectResult = 'About Page';

    const response = await request(app).get('/about');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });
  
});
