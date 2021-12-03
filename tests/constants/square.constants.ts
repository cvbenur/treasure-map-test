import {
  Square,
  MountainSquare,
  TreasureSquare,
} from "../../src/models/interfaces/square.interface";
import { SquareType } from "../../src/enums/square-type.enum";

export const EMPTY_SQUARE: Square = {
  loc: { x: 1, y: 1 },
  type: SquareType.NORMAL,
  canStop: false,
};
export const MOUNTAIN_SQUARE: MountainSquare = {
  loc: { x: 3, y: 3 },
  type: SquareType.MOUNTAIN,
  canStop: true,
};
export const TREASURE_SQUARE: TreasureSquare = {
  loc: { x: 1, y: 3 },
  type: SquareType.TREASURE,
  canStop: false,
  treasures: 4,
};

export const TOKENIZED_MOUNTAIN_SQUARE_LINE = 'M - 3 - 3'.split(' - ');
export const TOKENIZED_TREASURE_SQUARE_LINE = 'T - 1 - 3 - 4'.split(' - ');
export const TOKENIZED_UNRECOGNIZED_ERROR_LINE = 'X - 1 - 3 - 4'.split(' - ');
