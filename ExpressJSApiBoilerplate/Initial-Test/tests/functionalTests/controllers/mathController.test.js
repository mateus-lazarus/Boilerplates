import 'dotenv/config'
import request from 'supertest';
import { expect, describe, test } from '@jest/globals'

const url = process.env.FUNCTIONAL_TESTS_URL;

describe('mathController', () => {
  test('POST /square should return squared number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 25;

    const response = await request(url)
      .post('/square')
      .send({ number: inputValue });
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });

  test('POST /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(url)
      .post('/square')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('GET /square should return squared number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 25;

    const response = await request(url).get(`/square/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });
  
  test('GET /square should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(url).get(`/square/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('POST /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await request(url)
      .post('/double')
      .send({ number: inputValue });
    
      expect(response.statusCode).toBe(expectedStatusCode);
      expect(response.body.result).toBe(expectedResult);
  });

  test('POST /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(url)
      .post('/double')
      .send({ number: inputValue });

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test('GET /double should return doubled number', async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await request(url).get(`/double/${inputValue}`);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });


  test('GET /double should handle invalid number', async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await request(url).get(`/double/${inputValue}`);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });
  
});
