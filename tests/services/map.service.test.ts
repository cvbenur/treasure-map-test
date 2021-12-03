import { SquareType } from "../../src/enums/square-type.enum";
import { MountainSquare, TreasureSquare } from "../../src/models/interfaces/square.interface";
import { readSquareLine } from '../../src/services/map.service';

describe('map.service.ts', () => {
  describe('readSquareLine()', () => {
    it('should correctly read and initialize a MountainSquare', () => {
      // TODO: Move to constants file
      const tokenizedMtnSquareLine = 'M - 3 - 3'.split(' - ');

      const actual = readSquareLine(tokenizedMtnSquareLine);
      const expected: MountainSquare = {
        loc: { x: 3, y: 3 },
        type: SquareType.MOUNTAIN,
        canStop: true,
      };

      expect(actual).toStrictEqual(expected);
    });

    it('should correctly read and initialize a TreasureSquare', () => {
      // TODO: Move to constants file
      const tokenizedTrsSquareLine = 'T - 1 - 3 - 4'.split(' - ');

      const actual = readSquareLine(tokenizedTrsSquareLine);
      const expected: TreasureSquare = {
        loc: { x: 1, y: 3 },
        type: SquareType.TREASURE,
        canStop: false,
        treasures: 4,
      };

      expect(actual).toStrictEqual(expected);
    });

    it('should throw a "wrong square type" error when not recieving "M" or "T"', () => {
      const tokenizedWrongSquareLine = 'X - 1 - 3 - 4'.split(' - ');

      const actual = () => readSquareLine(tokenizedWrongSquareLine);
      const expected = new Error('Wrong square type: ' + tokenizedWrongSquareLine[0]);

      expect(actual).toThrow(expected);
    });
  });
});
