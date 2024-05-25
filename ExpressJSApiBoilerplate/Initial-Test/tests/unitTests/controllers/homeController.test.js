import { expect, jest, describe, beforeEach, it } from '@jest/globals'
import { getHomePage, getAboutPage } from "../../../controllers/homeController";

describe('HomeController Page Handlers', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jest.fn()
    };
  });

  describe('getHomePage', () => {
    it('should return "Hello, world!"', () => {
      getHomePage(req, res);
      expect(res.json).toHaveBeenCalledWith('Hello, world!');
    });
  });

  describe('getAboutPage', () => {
    it('should return "About Page"', () => {
      getAboutPage(req, res);
      expect(res.json).toHaveBeenCalledWith('About Page');
    });
  });

});
