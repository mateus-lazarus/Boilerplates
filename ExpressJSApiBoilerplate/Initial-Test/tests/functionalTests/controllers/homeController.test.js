import 'dotenv/config'
import request from 'supertest';
import { expect, describe, test } from '@jest/globals'

const url = process.env.FUNCTIONAL_TESTS_URL;

describe('homeController', () => {
  test('GET / should return "Hello, world!"', async () => {
    const expectResult = 'Hello, world!';

    const response = await request(url).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });

  test('GET /about should return "About Page"', async () => {
    const expectResult = 'About Page';

    const response = await request(url).get('/about');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });
  
});
