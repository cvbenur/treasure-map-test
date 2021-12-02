import { Adventurer } from "../models/interfaces/adventurer.interface";
import { Move } from "../enums/move.enum";
import { Orientation } from "../enums/orientation.enum";
import { TreasureMap } from "../models/interfaces/treasure-map.interface";
import { Location } from "../models/interfaces/location.interface";

/**
 * Initializes and returns an {@link Adventurer} object from a given line
 * @param tokens string[] - The tokenized line
 * @returns Initlalized Adventurer object
 */
export function readAdventurerLine(tokens: string[]): Adventurer {
  return {
    name: tokens[1],
    loc: { x: Number(tokens[2]), y: Number(tokens[3]) },
    orientation: tokens[4] as Orientation,
    moveSequence: tokens[5].split('') as Move[],
    treasures: 0,
  };
}

/**
 * Derives the next {@link Orientation} for an Adventurer
 * @param currentOrientation {@link Orientation} - The Adventurer's current orientation
 * @param nextMove {@link Move} - The Adventurer's next move
 * @returns Orientation
 */
export function getNextAdventurerOrientation(currentOrientation: Orientation, nextMove: Move): Orientation {
  // If the next move is 'A'
  if (nextMove === Move.FORWARD) {
    // The next orientation is equal to the current orientation
    return currentOrientation;
  }

  // Else, for any other move
  switch (currentOrientation) {
    // If the current orientation is 'N'
    case Orientation.NORTH:
      return nextMove === Move.LEFT ? Orientation.WEST : Orientation.EAST;
    
    // If the current orientation is 'S'
    case Orientation.SOUTH:
      return nextMove === Move.LEFT ? Orientation.EAST : Orientation.WEST;
    
    // If the current orientation is 'E'
    case Orientation.EAST:
      return nextMove === Move.LEFT ? Orientation.NORTH : Orientation.SOUTH;
    
    // If the current orientation is 'O'
    case Orientation.WEST:
      return nextMove === Move.LEFT ? Orientation.SOUTH : Orientation.NORTH;
  }
}

/**
 * Derives the next {@link Location} for an Adventurer
 * @param currentLoc {@link Location} - The Adventurer's current location on the map
 * @param currentOrientation {@link Orientation} - The Adventurer's current orientation
 * @param map {@link TreasureMap} - The map the Adventurer evolves on
 * @returns Location
 */
export function getNextAdventurerLocation(currentLoc: Location, currentOrientation: Orientation, map: TreasureMap): Location {
  // Setting nextLoc to current Loc, in case the adventurer can't move
  const nextLoc = currentLoc;

  switch (currentOrientation) {
    // If the Adventuer is moving north
    case Orientation.NORTH: {
      // If the next square to the north is reachable (inside map bounds and not an obstacle)
      if (nextLoc.y - 1 >= 0 && !map.layout[nextLoc.y - 1][nextLoc.x].canStop) {
        // Set Adventurer's next location to the next square to the north
        nextLoc.y = nextLoc.y - 1;
      }
    }
      break;
    
    // If the Adventuer is moving south
    case Orientation.SOUTH: {
      // If the next square to the south is reachable (inside map bounds and not an obstacle)
      if (nextLoc.y + 1 <= map.height && !map.layout[nextLoc.y + 1][nextLoc.x].canStop) {
        // Set Adventurer's next location to the next square to the south
        nextLoc.y = nextLoc.y + 1;
      }
    }
      break;
    
    // If the Adventuer is moving east
    case Orientation.EAST: {
      // If the next square to the east is reachable (inside map bounds and not an obstacle)
      if (nextLoc.x + 1 <= map.width && !map.layout[nextLoc.y][nextLoc.x + 1].canStop) {
        // Set Adventurer's next location to the next square to the east
        nextLoc.x = nextLoc.x + 1;
      }
    }
      break;
    
    // If the Adventuer is moving west
    case Orientation.WEST: {
      // If the next square to the west is reachable (inside map bounds and not an obstacle)
      if (nextLoc.x - 1 >= 0 && !map.layout[nextLoc.y][nextLoc.x - 1].canStop) {
        // Set Adventurer's next location to the next square to the west
        nextLoc.x = nextLoc.x - 1;
      }
    }
      break;
  }

  return nextLoc;
}

/**
 * Checks whether an Adventurer still has remaining moves to make
 * @param adv {@link Adventurer} - The Adventurer
 * @returns `true` if yes, `false` if no
 */
export function adventurerHasRemainingMoves(adv: Adventurer): boolean {
  return adv.moveSequence.length > 0;
}
