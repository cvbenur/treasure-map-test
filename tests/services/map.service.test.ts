import { readSquareLine } from '../../src/services/map.service';

import {
  TOKENIZED_MOUNTAIN_SQUARE_LINE,
  MOUNTAIN_SQUARE,
  TOKENIZED_TREASURE_SQUARE_LINE,
  TREASURE_SQUARE,
  TOKENIZED_UNRECOGNIZED_ERROR_LINE,
  WRONG_TOKENIZED_SQUARE_LINE,
} from "../constants/square.constants";

import { MAP_7_DATA } from "../constants/map.constants";
import { TreasureMap } from '../../src/models/interfaces/treasure-map.interface';

describe('map.service.ts', () => {
  describe('readSquareLine()', () => {
    it('should correctly read and initialize a MountainSquare', () => {
      const actual = readSquareLine(
        TOKENIZED_MOUNTAIN_SQUARE_LINE,
        MAP_7_DATA.map as TreasureMap
      );
      const expected = MOUNTAIN_SQUARE;

      expect(actual).toStrictEqual(expected);
    });

    it('should correctly read and initialize a TreasureSquare', () => {
      const actual = readSquareLine(
        TOKENIZED_TREASURE_SQUARE_LINE,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = TREASURE_SQUARE;

      expect(actual).toStrictEqual(expected);
    });

    it('should throw a "wrong square type" error when not recieving "M" or "T"', () => {
      const actual = () => readSquareLine(
        TOKENIZED_UNRECOGNIZED_ERROR_LINE,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong square type: ' + TOKENIZED_UNRECOGNIZED_ERROR_LINE[0]);

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong nbr of args" error for a mountain square', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.MOUNTAIN_WRONG_NBR_ARGS,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong number of arguments in line: ' + WRONG_TOKENIZED_SQUARE_LINE.MOUNTAIN_WRONG_NBR_ARGS.join(' - '));

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong nbr of args" error for a treasure square', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.TREASURE_WRONG_NBR_ARGS,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong number of arguments in line: ' + WRONG_TOKENIZED_SQUARE_LINE.TREASURE_WRONG_NBR_ARGS.join(' - '));

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong value for treasures" error for a treasure square', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.TREASURE_WRONG_NBR_TREASURES,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong value for treasures on line: ' + WRONG_TOKENIZED_SQUARE_LINE.TREASURE_WRONG_NBR_TREASURES.join(' - '));

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong X location" error', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_X_LOCATION,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong X Location for square line: ' + WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_X_LOCATION.join(' - '));

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong Y location" error', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_Y_LOCATION,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong Y Location for square line: ' + WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_Y_LOCATION.join(' - '));

      expect(actual).toThrow(expected);
    });

    it('should throw a "wrong Y location" error', () => {
      const actual = () => readSquareLine(
        WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_SPAWN_POINT,
        MAP_7_DATA.map as TreasureMap,
      );
      const expected = new Error('Wrong Location for square line (can\'t spawn here): ' + WRONG_TOKENIZED_SQUARE_LINE.ANY_WRONG_SPAWN_POINT.join(' - '));

      expect(actual).toThrow(expected);
    });
  });
});
