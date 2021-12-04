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

export const WRONG_TOKENIZED_SQUARE_LINE = {
  MOUNTAIN_WRONG_NBR_ARGS: 'M - 3 - 3 - 3'.split(' - '),
  TREASURE_WRONG_NBR_ARGS: 'T - 1 - 3'.split(' - '),
  TREASURE_WRONG_NBR_TREASURES: 'T - 1 - 3 - -2'.split(' - '),
  ANY_WRONG_X_LOCATION: 'T - A - 0 - -2'.split(' - '),
  ANY_WRONG_Y_LOCATION: 'M - 2 - -1'.split(' - '),
  ANY_WRONG_SPAWN_POINT: 'M - 2 - 2'.split(' - '),
}
