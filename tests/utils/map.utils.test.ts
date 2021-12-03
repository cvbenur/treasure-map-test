import { SquareType } from "../../src/enums/square-type.enum";
import { Square, MountainSquare, TreasureSquare } from "../../src/models/interfaces/square.interface";
import { getSquareSymbol } from "../../src/utils/map.utils";

describe('map.utils.ts', () => {
  describe('getSquareSymbol() - used for debugging', () => {
    it('should return the correct symbol for an empty square', () => {
      const emptySquare: Square = {
        loc: { x: 1, y: 1 },
        type: SquareType.NORMAL,
        canStop: false,
      };

      const actual = getSquareSymbol(emptySquare);
      const expected = '.';

      expect(actual).toBe(expected);
    });

    it('should return the correct symbol for a mountain square', () => {
      const mtnSquare: MountainSquare = {
        loc: { x: 1, y: 1 },
        type: SquareType.MOUNTAIN,
        canStop: true,
      };

      const actual = getSquareSymbol(mtnSquare);
      const expected = 'M';

      expect(actual).toBe(expected);
    });

    it('should return the correct symbol for a treasure square', () => {
      const trsSquare: TreasureSquare = {
        loc: { x: 1, y: 1 },
        type: SquareType.TREASURE,
        canStop: false,
        treasures: 4,
      };

      const actual = getSquareSymbol(trsSquare);
      const expected = 'T(4)';

      expect(actual).toBe(expected);
    });
  });
});
