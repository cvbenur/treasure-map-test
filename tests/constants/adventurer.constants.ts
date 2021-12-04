import { Move } from "../../src/enums/move.enum";
import { Orientation } from "../../src/enums/orientation.enum";
import { Adventurer } from "../../src/models/interfaces/adventurer.interface";

export const WELL_FORMED_ADVENTURER_LINE = `A - Indiana - 1 - 2 - N - ADGDADA`.split(' - ');
export const WRONG_ADVENTURER_LINE = {
  TOO_MANY_ARGUMENTS: 'A - Indiana - 1 - 2 - N - ADGDADA - XXXX'.split(' - '),
  WRONG_X_LOCATION_DATA: 'A - Indiana - B - 0 - N - ADGDADA'.split(' - '),
  WRONG_Y_LOCATION_DATA: 'A - Indiana - 1 - 38 - N - ADGDADA'.split(' - '),
  WRONG_ORIENTATION: 'A - Indiana - 1 - 2 - X - ADGDADA'.split(' - '),
  WRONG_MOVE_SEQUENCE: 'A - Indiana - 1 - 2 - N - AXDGDADA'.split(' - '),
  WRONG_SPAWN_POINT: 'A - Indiana - 1 - 1 - N - AXDGDADA'.split(' - '),
}

export const INDIANA: Adventurer = {
  name: 'Indiana',
  loc: { x: 1, y: 2 },
  orientation: Orientation.NORTH,
  moveSequence: [Move.FORWARD, Move.RIGHT, Move.LEFT, Move.RIGHT, Move.FORWARD, Move.RIGHT, Move.FORWARD],
  treasures: 0
};

export const LARA: Adventurer = {
  name: 'Lara',
  loc: { x: 1, y: 2 },
  orientation: Orientation.NORTH,
  moveSequence: [],
  treasures: 0
};

export const NATHAN_DRAKE: Adventurer = {
  name: 'Nathan',
  loc: { x: 2, y: 3 },
  orientation: Orientation.EAST,
  moveSequence: [Move.LEFT, Move.FORWARD],
  treasures: 4
};
