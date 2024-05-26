import 'dotenv/config'
import request from 'supertest';
import { expect, describe, test } from '@jest/globals'

const url = process.env.FUNCTIONAL_TESTS_URL;
const squarePath = '/math/square';
const doublePath = '/math/double';

const postMathRequest = async (path, input) => {
  return await request(url)
    .post(path)
    .send({ number: input });
};

const getMathRequest = async (path, input) => {
  return await request(url).get(`${path}/${input}`);
};

describe('mathController', () => {
  test(`POST ${squarePath} should return squared number`, async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 25;

    const response = await postMathRequest(squarePath, inputValue);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });

  test(`POST ${squarePath} should handle invalid number`, async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await postMathRequest(squarePath, inputValue);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test(`GET ${squarePath} should return squared number`, async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 25;

    const response = await getMathRequest(squarePath, inputValue);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });
  
  test(`GET ${squarePath} should handle invalid number`, async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await getMathRequest(squarePath, inputValue);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test(`POST ${doublePath} should return doubled number`, async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await postMathRequest(doublePath, inputValue);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });

  test(`POST ${doublePath} should handle invalid number`, async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await postMathRequest(doublePath, inputValue);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });

  test(`GET ${doublePath} should return doubled number`, async () => {
    const inputValue = 5;
    const expectedStatusCode = 200;
    const expectedResult = 10;

    const response = await getMathRequest(doublePath, inputValue);
    
    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.result).toBe(expectedResult);
  });


  test(`GET ${doublePath} should handle invalid number`, async () => {
    const inputValue = 'abc';
    const expectedStatusCode = 500;
    const expectedResult = 'Invalid number';

    const response = await getMathRequest(doublePath, inputValue);

    expect(response.statusCode).toBe(expectedStatusCode);
    expect(response.body.error.message).toBe(expectedResult);
  });
  
});
