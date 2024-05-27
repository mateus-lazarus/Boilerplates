import { expect, jest, describe, beforeEach, it } from '@jest/globals'
import { getSquare, postSquare, getDouble, postDouble } from "./mathController";

describe('MathController Page Handlers', () => {
  let req, res;

  beforeEach(() => {
    req = { "params": { "number": 3 }, "body": { "number": 3 } };
    res = {
      json: jest.fn()
    };
  });

  describe('getSquare', () => {
    it('[3] should result in [9]', () => {
      getSquare(req, res);
      expect(res.json).toHaveBeenCalledWith({"result": 9});
    });
  });
  
  describe('postSquare', () => {
    it('[3] should result in [9]', () => {
      postSquare(req, res);
      expect(res.json).toHaveBeenCalledWith({"result": 9});
    });
  });
  
  describe('getDouble', () => {
    it('[3] should result in [6]', () => {
      getDouble(req, res);
      expect(res.json).toHaveBeenCalledWith({"result": 6});
    });
  });
  
  describe('postDouble', () => {
    it('[3] should result in [6]', () => {
      postDouble(req, res);
      expect(res.json).toHaveBeenCalledWith({"result": 6});
    });
  });
  
});
