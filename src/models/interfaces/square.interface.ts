import { SquareType } from "../../enums/square-type.enum";
import { Location } from '../interfaces/location.interface';

export interface Square {
  /**
   * The square's {@link Location} on the map
   */
  loc: Location

  /**
   * The square's type as defined by {@link SquareType}
   */
  type: SquareType;

  /**
   * The square's ability to block the {@link Adventurer}
   */
  canStop: boolean;
}

export interface TreasureSquare extends Square {
  /**
   * The number of treasures that remain on the square
   */
  treasures: number;
}

export type MountainSquare = Square;
