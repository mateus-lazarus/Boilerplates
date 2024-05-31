import { squareNumber, doubleNumber } from './../services/mathService.js';

export const getSquare = (req, res, next) => {
  try {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = squareNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const getDouble = (req, res, next) => {
  try {
    const number = parseInt(req.params.number, 10);
    if (isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = doubleNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const postSquare = (req, res, next) => {
  try {
    const { number } = req.body;
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid number');
    }
    
    const result = squareNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};

export const postDouble = (req, res, next) => {
  try {
    const { number } = req.body;
    if (typeof number !== 'number' || isNaN(number)) {
      throw new Error('Invalid number');
    }

    const result = doubleNumber(number);

    res.json({ result });

  } catch (error) {
    next(error);
  }
};
