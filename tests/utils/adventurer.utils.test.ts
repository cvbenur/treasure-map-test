import { getPrintableAdventurerDetails, printDetailsForAllAdventurers } from "../../src/utils/adventurer.utils";

import { NATHAN_DRAKE } from "../constants/adventurer.constants";

describe('adventurer.utils.ts', () => {
  describe('getPrintableAdventurerDetails()', () => {
    it('should return the correct adventurer details', () => {
      const actual = getPrintableAdventurerDetails(NATHAN_DRAKE);
      const expected = 'A - Nathan - 2 - 3 - E - 4';

      expect(actual).toBe(expected);
    });
  });
});