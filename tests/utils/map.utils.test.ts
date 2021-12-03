import { getMapAsFormattedText } from "../../src/utils/map.utils";
import {
  MAP_2_DATA
} from "../constants/map.constants";
import { TreasureMap } from "../../src/models/interfaces/treasure-map.interface";


describe('map.utils.ts', () => {
  describe('getMapAsFormattedText()', () => {
    it('should return correctly formatted map data', () => {
      const actual = getMapAsFormattedText(MAP_2_DATA.map as TreasureMap);
      const expected = 'C - 3 - 4\n'
        + 'M - 1 - 0\n'
        + 'M - 2 - 1\n'
        + 'T - 0 - 3 - 2\n'
        + 'T - 1 - 3 - 3\n';
      
      expect(actual).toBe(expected);
    });
  });
});
