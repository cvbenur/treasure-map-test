import { Move } from "../../src/enums/move.enum";
import { Orientation } from "../../src/enums/orientation.enum";
import {
  readAdventurerLine,
  getNextAdventurerOrientation,
  getNextAdventurerLocation,
  adventurerHasRemainingMoves,
} from "../../src/services/adventurer.service";
import { Location } from "../../src/models/interfaces/location.interface";
import { TreasureMap } from "../../src/models/interfaces/treasure-map.interface";

import {
  WELL_FORMED_ADVENTURER_LINE,
  WRONG_ADVENTURER_LINE,
  INDIANA,
  LARA
} from "../constants/adventurer.constants";

import { MAP_3_DATA } from "../constants/map.constants";

describe('adventurer.service.ts', () => {
  describe('readAventurerLine()', () => {
    it('should init a new Adventurer object from a well-formed Adventurer definition line', () => {
      const actual = readAdventurerLine(WELL_FORMED_ADVENTURER_LINE, MAP_3_DATA.map as TreasureMap);
      const expected = INDIANA;

      expect(actual).toStrictEqual(expected);
    });

    it('should throw a "Too many arguments in line" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.TOO_MANY_ARGUMENTS,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Too many arguments in line: ' + WRONG_ADVENTURER_LINE.TOO_MANY_ARGUMENTS.join(' - ');
      
      expect(mockFn).toThrow(expected);
    });

    it('should throw a "wrong X location" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.WRONG_X_LOCATION_DATA,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Wrong X Location for adventurer line: ' + WRONG_ADVENTURER_LINE.WRONG_X_LOCATION_DATA.join(' - ');

      expect(mockFn).toThrow(expected);
    });

    it('should throw a "wrong Y location" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.WRONG_Y_LOCATION_DATA,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Wrong Y Location for adventurer line: ' + WRONG_ADVENTURER_LINE.WRONG_Y_LOCATION_DATA.join(' - ');

      expect(mockFn).toThrow(expected);
    });

    it('should throw a "wrong spawn point" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.WRONG_SPAWN_POINT,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Wrong Location for adventurer line (can\'t spawn here): ' + WRONG_ADVENTURER_LINE.WRONG_SPAWN_POINT.join(' - ');

      expect(mockFn).toThrow(expected);
    });

    it('should throw a "wrong orientation" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.WRONG_ORIENTATION,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Wrong Orientation for adventurer line: ' + WRONG_ADVENTURER_LINE.WRONG_ORIENTATION.join(' - ');

      expect(mockFn).toThrow(expected);
    });

    it('should throw a "wrong move sequence" error', () => {
      const mockFn = () => readAdventurerLine(
        WRONG_ADVENTURER_LINE.WRONG_MOVE_SEQUENCE,
        MAP_3_DATA.map as TreasureMap,
      );

      const expected = 'Wrong move sequence for adventurer line: ' + WRONG_ADVENTURER_LINE.WRONG_MOVE_SEQUENCE.join(' - ');

      expect(mockFn).toThrow(expected);
    });
  });

  describe('getNextAdventurerOrientation()', () => {
    it('should return the current orientation when the next move is "forward"', () => {
      const actual = getNextAdventurerOrientation(Orientation.EAST, Move.FORWARD);
      const expected = Orientation.EAST;

      expect(actual).toBe(expected);
    });

    it('should return "east" when the current orientation is "north" and the next move is "right"', () => {
      const actual = getNextAdventurerOrientation(Orientation.NORTH, Move.RIGHT);
      const expected = Orientation.EAST;

      expect(actual).toBe(expected);
    });

    it('should return "west" when the current orientation is "north" and the next move is "left"', () => {
      const actual = getNextAdventurerOrientation(Orientation.NORTH, Move.LEFT);
      const expected = Orientation.WEST;

      expect(actual).toBe(expected);
    });

    it('should return "west" when the current orientation is "south" and the next move is "right"', () => {
      const actual = getNextAdventurerOrientation(Orientation.SOUTH, Move.RIGHT);
      const expected = Orientation.WEST;

      expect(actual).toBe(expected);
    });

    it('should return "east" when the current orientation is "south" and the next move is "left"', () => {
      const actual = getNextAdventurerOrientation(Orientation.SOUTH, Move.LEFT);
      const expected = Orientation.EAST;

      expect(actual).toBe(expected);
    });

    it('should return "south" when the current orientation is "east" and the next move is "right"', () => {
      const actual = getNextAdventurerOrientation(Orientation.EAST, Move.RIGHT);
      const expected = Orientation.SOUTH;

      expect(actual).toBe(expected);
    });

    it('should return "north" when the current orientation is "east" and the next move is "left"', () => {
      const actual = getNextAdventurerOrientation(Orientation.EAST, Move.LEFT);
      const expected = Orientation.NORTH;

      expect(actual).toBe(expected);
    });

    it('should return "north" when the current orientation is "west" and the next move is "right"', () => {
      const actual = getNextAdventurerOrientation(Orientation.WEST, Move.RIGHT);
      const expected = Orientation.NORTH;

      expect(actual).toBe(expected);
    });

    it('should return "south" when the current orientation is "west" and the next move is "left"', () => {
      const actual = getNextAdventurerOrientation(Orientation.WEST, Move.LEFT);
      const expected = Orientation.SOUTH;

      expect(actual).toBe(expected);
    });
  });

  describe('getNextAdventurerLocation()', () => {
    it('should return current square when next square can block', () => {
      /** Starting situation :
       * .  .  .
       * A  M  .
       * .  .  .
       */
      const currentLocation: Location = { x: 0, y: 1 };
      const currentOrientation: Orientation = Orientation.EAST;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected = currentLocation;

      expect(actual).toBe(expected);
    });

    it('should return current square when next square is out of map bounds', () => {
      /** Starting situation :
       * .  .  .
       * .  M  A
       * .  .  .
       */
      const currentLocation: Location = { x: 2, y: 1 };
      const currentOrientation: Orientation = Orientation.EAST;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected = currentLocation;

      expect(actual).toBe(expected);
    });

    it('should return next square to the north when going forward with orientation north inside map bounds', () => {
      /** Starting situation :
       * .  .  .
       * .  M  A
       * .  .  .
       */
      const currentLocation: Location = { x: 2, y: 1 };
      const currentOrientation: Orientation = Orientation.NORTH;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected: Location = { x: 2, y: 0 };

      expect(actual).toStrictEqual(expected);
    });

    it('should return next square to the south when going forward with orientation south inside map bounds', () => {
      /** Starting situation :
       * .  .  .
       * .  M  A
       * .  .  .
       */
      const currentLocation: Location = { x: 2, y: 1 };
      const currentOrientation: Orientation = Orientation.SOUTH;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected: Location = { x: 2, y: 2 };

      expect(actual).toStrictEqual(expected);
    });

    it('should return next square to the east when going forward with orientation east inside map bounds', () => {
      /** Starting situation :
       * .  .  .
       * .  M  .
       * .  A  .
       */
      const currentLocation: Location = { x: 1, y: 2 };
      const currentOrientation: Orientation = Orientation.EAST;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected: Location = { x: 2, y: 2 };

      expect(actual).toStrictEqual(expected);
    });

    it('should return next square to the west when going forward with orientation west inside map bounds', () => {
      /** Starting situation :
       * .  .  .
       * .  M  .
       * .  A  .
       */
      const currentLocation: Location = { x: 1, y: 2 };
      const currentOrientation: Orientation = Orientation.WEST;

      const actual = getNextAdventurerLocation(currentLocation, currentOrientation, MAP_3_DATA.map as TreasureMap);
      const expected: Location = { x: 0, y: 2 };

      expect(actual).toStrictEqual(expected);
    });
  });

  describe('adventurerHasRemainingMoves()', () => {
    it('should return `false` for an Adventurer with no moves remaining', () => {
      const actual = adventurerHasRemainingMoves(LARA);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('should return `true` for an Adventurer with moves remaining', () => {
      const actual = adventurerHasRemainingMoves(INDIANA);
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
});
