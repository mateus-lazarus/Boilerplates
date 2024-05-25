import request from 'supertest';
import express from 'express';
import { expect, describe, test } from '@jest/globals'
import { mathRoutes } from '../../../routes/mathRoutes.js';
import { generalErrorHandler } from "../../../utils/errorUtils.js";

const app = express();
app.use(express.json());
app.use('/', mathRoutes);
app.use(generalErrorHandler);

describe('mathController', () => {
  test('POST /square should return squared number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;

    const response = await request(app)
      .post('/square')
      .send({ number: inputValue });
    
    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test('POST /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;

    const response = await request(app)
      .post('/square')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test('GET /square should return squared number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;

    const response = await request(app).get(`/square/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
  });
  
  test('GET /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;

    const response = await request(app).get(`/square/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test('POST /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;

    const response = await request(app)
      .post('/double')
      .send({ number: inputValue });
    
      expect(response.statusCode).toBe(expectedStatusCode);
  });

  test('POST /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;

    const response = await request(app)
      .post('/double')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
  });

  test('GET /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;

    const response = await request(app).get(`/double/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
  });


  test('GET /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;

    const response = await request(app).get(`/double/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
  });
  
});
