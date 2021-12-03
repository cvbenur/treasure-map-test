import { readSquareLine } from '../../src/services/map.service';

import {
  TOKENIZED_MOUNTAIN_SQUARE_LINE,
  MOUNTAIN_SQUARE,
  TOKENIZED_TREASURE_SQUARE_LINE,
  TREASURE_SQUARE,
  TOKENIZED_UNRECOGNIZED_ERROR_LINE,
} from "../constants/square.constants";

describe('map.service.ts', () => {
  describe('readSquareLine()', () => {
    it('should correctly read and initialize a MountainSquare', () => {
      const actual = readSquareLine(TOKENIZED_MOUNTAIN_SQUARE_LINE);
      const expected = MOUNTAIN_SQUARE;

      expect(actual).toStrictEqual(expected);
    });

    it('should correctly read and initialize a TreasureSquare', () => {
      const actual = readSquareLine(TOKENIZED_TREASURE_SQUARE_LINE);
      const expected = TREASURE_SQUARE;

      expect(actual).toStrictEqual(expected);
    });

    it('should throw a "wrong square type" error when not recieving "M" or "T"', () => {
      const actual = () => readSquareLine(TOKENIZED_UNRECOGNIZED_ERROR_LINE);
      const expected = new Error('Wrong square type: ' + TOKENIZED_UNRECOGNIZED_ERROR_LINE[0]);

      expect(actual).toThrow(expected);
    });
  });
});
