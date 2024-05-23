import { doubleNumber, squareNumber } from '../../../services/mathService.js';


describe("MathService.DoubleNumber()", () => {
  const input = [0, 1, 2, 3];
  const expectResults = [0, 2, 4, 6];

  input.forEach( (number, index) => {
      const expectResult = expectResults[index];

      test(`[${number}] should result in ${expectResult}`, () => {
        expect(doubleNumber(number)).toBe(expectResult);
      });
    }
  )

});


describe("MathService.SquareNumber()", () => {
  const input = [0, 1, 2, 3];
  const expectResults = [0, 1, 4, 9];

  input.forEach( (number, index) => {
      const expectResult = expectResults[index];

      test(`[${number}] should result in ${expectResult}`, () => {
        expect(squareNumber(number)).toBe(expectResult);
      });
    }
  )

});