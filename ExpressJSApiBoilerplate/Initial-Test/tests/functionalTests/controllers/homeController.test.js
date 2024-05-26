import 'dotenv/config'
import request from 'supertest';
import { expect, describe, test } from '@jest/globals'

const url = process.env.FUNCTIONAL_TESTS_URL;

const getHomeRequest = async (path) => {
  return await request(url).get(path);
};

describe('homeController', () => {
  test('GET / should return "Hello, world!"', async () => {
    const expectResult = 'Hello, world!';

    const response = await getHomeRequest('/');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });

  test('GET /about should return "About Page"', async () => {
    const expectResult = 'About Page';

    const response = await getHomeRequest('/about');

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(expectResult);
  });
  
});
