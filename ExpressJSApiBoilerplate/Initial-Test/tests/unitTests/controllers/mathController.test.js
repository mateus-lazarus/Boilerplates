import request from 'supertest';
import express from 'express';
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
    const expectedResult = 25;

    const response = await request(app)
      .post('/square')
      .send({ number: inputValue });
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });

  test('POST /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(app)
      .post('/square')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('GET /square should return squared number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 25;

    const response = await request(app).get(`/square/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });
  
  test('GET /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(app).get(`/square/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('POST /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await request(app)
      .post('/double')
      .send({ number: inputValue });
    
      expect(response.statusCode).toBe(expectedStatusCode);
      expect(response.body.result).toBe(expectedResult);
  });

  test('POST /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(app)
      .post('/double')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('GET /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await request(app).get(`/double/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });


  test('GET /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(app).get(`/double/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });
  
});
