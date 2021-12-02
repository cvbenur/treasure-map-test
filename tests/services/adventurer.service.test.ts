import { Move } from "../../src/enums/move.enum";
import { Orientation } from "../../src/enums/orientation.enum";
import { Adventurer } from "../../src/models/interfaces/adventurer.interface";
import {
  readAdventurerLine,
  getNextAdventurerOrientation,
  getNextAdventurerLocation,
  adventurerHasRemainingMoves,
} from "../../src/services/adventurer.service";
import { loadDataFromFile } from "../../src/services/file-parser.service";
import { INPUT_DIRECTORY_PATH } from "../../src/constants/file.constants";
import { join } from "path";

describe('adventurer.service.ts', () => {
  describe('readAventurerLine()', () => {
    it('should init a new Adventurer object from a well-formed Adventurer definition line', () => {
      // TODO: move to constants file
      const wellFormedAdventurerLine = `A - Indiana - 1 - 2 - N - ADGDADA`.split(' - ');

      const actual = readAdventurerLine(wellFormedAdventurerLine);
      // TODO: move to constants file
      const expected: Adventurer = {
        name: 'Indiana',
        loc: { x: 1, y: 2 },
        orientation: Orientation.NORTH,
        moveSequence: [Move.FORWARD, Move.RIGHT, Move.LEFT, Move.RIGHT, Move.FORWARD, Move.RIGHT, Move.FORWARD],
        treasures: 0
      };

      expect(actual).toStrictEqual(expected);
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

  // TODO
  describe('getNextAdventurerLocation()', () => {
    const { map } = loadDataFromFile(join(INPUT_DIRECTORY_PATH, 'test-map-1.txt'));
    
    it('should return next square to the left when going "west" inside map bounds with no blocking square on the path', () => {
      
    });
  });

  describe('adventurerHasRemainingMoves()', () => {
    it('should return `false` for an Adventurer with no moves remaining', () => {
      // TODO: move to constants file
      const advWithNoRemainingMoves: Adventurer = {
        name: 'Indiana',
        loc: { x: 1, y: 2 },
        orientation: Orientation.NORTH,
        moveSequence: [],
        treasures: 0
      };

      const actual = adventurerHasRemainingMoves(advWithNoRemainingMoves);
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('should return `true` for an Adventurer with moves remaining', () => {
      // TODO: move to constants file
      const advWithMovesRemaining: Adventurer = {
        name: 'Indiana',
        loc: { x: 1, y: 2 },
        orientation: Orientation.NORTH,
        moveSequence: [Move.FORWARD, Move.RIGHT, Move.LEFT, Move.RIGHT, Move.FORWARD, Move.RIGHT, Move.FORWARD],
        treasures: 0
      };

      const actual = adventurerHasRemainingMoves(advWithMovesRemaining);
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
})
