import { Adventurer } from "../../src/models/interfaces/adventurer.interface";
import { Orientation } from "../../src/enums/orientation.enum";
import { Move } from "../../src/enums/move.enum";
import { getPrintableAdventurerDetails, printDetailsForAllAdventurers } from "../../src/utils/adventurer.utils";

describe('adventurer.utils.ts', () => {
  // TODO: move to constants file
  const indy: Adventurer = {
    name: 'Indiana',
    loc: { x: 1, y: 2 },
    orientation: Orientation.NORTH,
    moveSequence: [Move.FORWARD, Move.RIGHT, Move.LEFT, Move.RIGHT, Move.FORWARD, Move.RIGHT, Move.FORWARD],
    treasures: 4
  };

  // TODO: move to constants file
  const lara: Adventurer = {
    name: 'Lara',
    loc: { x: 3, y: 2 },
    orientation: Orientation.EAST,
    moveSequence: [Move.FORWARD],
    treasures: 0
  };
  
  describe('getPrintableAdventurerDetails()', () => {
    it('should return the correct adventurer details', () => {
      const actual = getPrintableAdventurerDetails(indy);
      const expected = 'A - Indiana - 1 - 2 - N - 4';

      expect(actual).toBe(expected);
    });
  });
});